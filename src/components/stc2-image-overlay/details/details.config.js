module.exports = {  
  variants: 
      [
            {
            	name: 'default',
            	label: 'Default',
                  context: {
                        "more_than_five_images": false
                  }
            },
            {
            	name: 'more-than-five-images',
            	label: 'More than five images',
                  context: {
                        "more_than_five_images": true
                  }
            }
      ]
}