const fs = require('fs');
const { parse, stringify } = require('svgson');
const svgSpritePath = 'build/svg/vam-sprite.svg';

const readSvgSprite = async (path) => {
  const response = await fs.promises.readFile(path, 'utf8');

  return response;
}

let cummulativeSumViewBoxHeight = 0;

// return a modified viewBox set of values
const getUpdatedViewBoxData = (thisViewBoxData, cummulativeSumViewBoxHeight, i, id) => {
  let updatedViewBoxData = thisViewBoxData.split(' ');

  // replace the min-y component of the existing viewBox data
  updatedViewBoxData.splice(1, 1, i == 0 ? cummulativeSumViewBoxHeight : cummulativeSumViewBoxHeight);

  // return the viewBox data to its native state
  updatedViewBoxData = updatedViewBoxData.join(' ').toString();

  if (i <= 12) {
    console.log('i : ', i);
    console.log('id : ', id); // this can be removed from the method sig.
    console.log('thisViewBoxData : ', thisViewBoxData);
    console.log('updatedViewBoxData : ', updatedViewBoxData);
    console.log('cummulativeSumViewBoxHeight : ', cummulativeSumViewBoxHeight);
    console.log('------');
  }

  return updatedViewBoxData;
};

// deserialize SVG
readSvgSprite(svgSpritePath).then((result) => {
  parse(result).then((objSvgSprite) => {
    // <defs> - this is being incorrectly written by
    // svg-sprite-loader as parent of all <symbol> tags
    const svgSymbolsParent = objSvgSprite.children[0];

    // exit in event that script is executed having
    // been run already after webpack bundling
    if (svgSymbolsParent.name !== 'defs') {
      return;
    }

    const arrSymbols = Array.from(svgSymbolsParent.children);

    // create <view/> and <use/> for each <symbol>
    arrSymbols.map((child, i) => {
      if (child.name === 'symbol') {
        // vertical position of each SVG icon in the sprite, + 1 is spacing
        cummulativeSumViewBoxHeight += parseInt(child.attributes.viewBox.split(' ').at(2)) + 1;

        objSvgSprite.children.push(
          {
            name: 'view',
            parent: null,
            type: 'element',
            value: '',
            attributes: {
              id: `${child.attributes.id}-view`,
              viewBox: getUpdatedViewBoxData(child.attributes.viewBox, cummulativeSumViewBoxHeight, i, child.attributes.id),
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
      }

      // push all <symbol> children of <defs> as children of <svg>
      objSvgSprite.children.push(child);

      // remove <defs>
      delete objSvgSprite.children[0];
    });

    // serialize back to SVG
    const svgSprite = stringify(objSvgSprite);

    // write SVG back to the file and notify
    fs.writeFile(svgSpritePath, svgSprite, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('File build/svg/vam-sprite.svg updated.');
      }
    });
  });
}).catch(console.error);
