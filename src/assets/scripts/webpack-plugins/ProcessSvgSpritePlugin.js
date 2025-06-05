const pluginName = 'ProcessSvgSpritePlugin';
const fs = require('fs');
const { parse, stringify } = require('svgson');

// update build/svg/vam-sprite.svg with view/use tags and vertical icon spacing
class ProcessSvgSpritePlugin {
  apply(compiler) {
    compiler.hooks.done.tap(pluginName, () => {
      const svgSpritePath = 'build/svg/vam-sprite.svg';

      const readSvgSprite = async (path) => {
        const response = await fs.promises.readFile(path, 'utf8');
      
        return response;
      }

      let cummulativeSumViewBoxHeight = 0;

      // return a modified viewBox set of values
      const getUpdatedViewBoxData = (thisViewBoxData, cummulativeSumViewBoxHeight) => {
        let updatedViewBoxData = thisViewBoxData.split(' ');

        // replace the min-y component of the existing viewBox data
        updatedViewBoxData.splice(1, 1, cummulativeSumViewBoxHeight);

        // return the viewBox data to its native state
        updatedViewBoxData = updatedViewBoxData.join(' ').toString();

        return updatedViewBoxData;
      };

      // deserialize SVG
      readSvgSprite(svgSpritePath).then((result) => {
        parse(result).then((objSvgSprite) => {
          // <defs> - this is being written by svg-sprite-loader
          // as parent of all <symbol> tags
          const svgSymbolsParent = objSvgSprite.children[0];
          const arrSymbols = Array.from(svgSymbolsParent.children);

          // create <view/> and <use/> for each <symbol>
          arrSymbols.map((child, i) => {
            if (child.name === 'symbol') {
              // vertical position of each SVG icon in the sprite
              if (i > 0) {
                const thisSymbol = child.attributes.viewBox;
                const thisViewBoxDataHeight = thisSymbol.split(' ').at(3);
                const prevSymbol = arrSymbols[i - 1].attributes.viewBox;

                if (prevSymbol) {
                  // for variable height icons:
                  // height of this icon - height of previous icon = offset
                  // cummulativeSumViewBoxHeight = cummulativeSumViewBoxHeight - offset

                  const prevViewBoxDataHeight = prevSymbol.split(' ').at(3);
                  const symbolOffset = thisViewBoxDataHeight - prevViewBoxDataHeight;

                  cummulativeSumViewBoxHeight += parseInt(child.attributes.viewBox.split(' ').at(3));
                  cummulativeSumViewBoxHeight -= symbolOffset;
                  cummulativeSumViewBoxHeight += 10; // vertical spacer
                }
              } // otherwise cummulativeSumViewBoxHeight is 0, it's the first member

              objSvgSprite.children.push(
                {
                  name: 'view',
                  parent: null,
                  type: 'element',
                  value: '',
                  attributes: {
                    id: `${child.attributes.id}-view`,
                    viewBox: getUpdatedViewBoxData(child.attributes.viewBox, cummulativeSumViewBoxHeight),
                  },
                },
                {
                  name: 'use',
                  parent: null,
                  type: 'element',
                  value: '',
                  attributes: {
                    'xlink:href': `#${child.attributes.id}`,
                    x: child.attributes.viewBox.split(' ').at(0),
                    y: cummulativeSumViewBoxHeight,
                    width: child.attributes.viewBox.split(' ').at(2),
                    height: child.attributes.viewBox.split(' ').at(3),
                  },
                }
              );

              // push all <symbol> children of <defs> as children of <svg>
              objSvgSprite.children.push(child);
            }

            // remove the high level <defs> but not any existing inside SVG icons
            delete objSvgSprite.children[0];
          });

          // serialize to SVG
          const svgSprite = stringify(objSvgSprite);
          
          // write back to the file and notify
          fs.writeFile(svgSpritePath, svgSprite, (error) => {
            if (error) {
              console.log(error);
            } else {
              console.log('File build/svg/vam-sprite.svg updated.');
            }
          });
        });
      }).catch(console.error);
    });
  }
}

module.exports = ProcessSvgSpritePlugin;
