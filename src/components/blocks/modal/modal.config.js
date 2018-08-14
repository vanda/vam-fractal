module.exports = {
  title: 'Modal',
  label: 'Modal',
  context: {
    title: 'We need your help',
    body: 'Hello. We are working to improve our collections online and would like to understand better how our visitors use our site. Please could you spare two minutes to answer some questions?',
    cta: {
      title: 'Take the survey',
      url: 'http://www.vam.ac.uk'
    },
    dismiss: 'No thanks. Continue to the V&A website',
    modalID: 'stc_survey',
    modalOnceOnly: ''
  },
  variants: [
    {
      name: 'Once Only',
      context: {
        modalDomain: 'localhost',
        modalOnceOnly: 'yes'
      }
    }
  ]
};
