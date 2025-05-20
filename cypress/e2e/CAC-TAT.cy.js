//describe('template spec', () => {
//  it('passes', () => {
//    cy.visit('https://example.cypress.io')
//  })
//})



beforeEach(() => {
  cy.visit('./src/index.html')
})

//section 3
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  
  it('verifica o título da aplicação', () => {
    //cy.visit('./src/index.html')
    cy.title().should('eq','Central de Atendimento ao Cliente TAT')

  })
  
  it('EXTRA 1 - preenche os campos obrigatórios e envia o formulário', () =>{
    cy.get('input[id="firstName"]').should('be.visible')
    cy.get('input[id="firstName"]').type('Bruno')
    cy.get('input[id="firstName"]').should('have.value','Bruno')

    cy.get('input[id="lastName"]').should('be.visible')
    cy.get('input[id="lastName"]').type('Castro')
    cy.get('input[id="lastName"]').should('have.value','Castro')
  
    cy.get('input[id="email"]').should('be.visible')
    cy.get('input[id="email"]').type('bruno@teste.com')
    cy.get('input[id="email"]').should('have.value','bruno@teste.com')
  
    cy.get('textarea[id="open-text-area"]').should('be.visible')
    //cy.get('textarea[id="open-text-area"]').type('Teessssssssssssteeeeeeeeeeeee looooooooooooooooongooooooooooooooo',{delay:0})
    //cy.get('textarea[id="open-text-area"]').should('have.value','Teessssssssssssteeeeeeeeeeeee looooooooooooooooongooooooooooooooo')

    const longText = Cypress._.repeat('abcde',40)
    cy.get('textarea[id="open-text-area"]').type(longText,{delay:0})
    cy.get('textarea[id="open-text-area"]').should('have.value',longText)
    
    
    cy.get('button[type="submit"]').click()
    cy.get('span[class="success"]').should('be.visible')
  })

  it('EXTRA 2 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    
    cy.get('input[id="firstName"]').type('Bruno')
    cy.get('input[id="lastName"]').type('Castro')
    cy.get('input[id="email"]').type('bruno@teste') //missing .com
    cy.get('textarea[id="open-text-area"]').type('Obrigado')

    cy.get('button[type="submit"]').click()
    cy.get('span[class="error"]').should('be.visible')

  })

  it('EXTRA 3 - Verifica campo numero aceita somente digitos numéricos', () => {
    
    cy.get('input[id="phone"]').type('Teste sem dígito numérico')
    cy.get('input[id="phone"]').should('have.value','')

  })

  it('EXTRA 4 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    
    cy.get('input[id="phone-checkbox"]').click()
    cy.get('button[type="submit"]').click()
    cy.get('span[class="error"]').should('be.visible')

  })

  it('EXTRA 5 - preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    
    cy.get('input[id="firstName"]').type('Bruno')
    cy.get('input[id="lastName"]').type('Castro')
    cy.get('input[id="email"]').type('bruno@teste.com')
    cy.get('input[id="phone"]').type('5535999887766')

    cy.get('input[id="firstName"]').should('have.value','Bruno')
    cy.get('input[id="lastName"]').should('have.value','Castro')
    cy.get('input[id="email"]').should('have.value','bruno@teste.com')
    cy.get('input[id="phone"]').should('have.value','5535999887766')

    cy.get('input[id="firstName"]').clear()
    cy.get('input[id="lastName"]').clear()
    cy.get('input[id="email"]').clear()
    cy.get('input[id="phone"]').clear()

    cy.get('input[id="firstName"]').should('have.value','')
    cy.get('input[id="lastName"]').should('have.value','')
    cy.get('input[id="email"]').should('have.value','') //missing .com
    cy.get('input[id="phone"]').should('have.value','')

  })  


    it('EXTRA 6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
   
    cy.get('button[type="submit"]').click()
    cy.get('span[class="error"]').should('be.visible')

  })

  it('EXTRA 7 - envia o formuário com sucesso usando um comando customizado', () => {
   
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('span[class="success"]').should('be.visible')

  })



  it('EXTRA 7.2 - envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Bruno',
      lastName: 'Castro',
      email: 'bruno@teste.com',
      text: 'Obrigado'
    }
    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('span[class="success"]').should('be.visible')

  })

  it('EXTRA 8 - cy.contains - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    
    cy.get('input[id="phone-checkbox"]').click()
    cy.contains('button','Enviar').click()
    cy.get('span[class="error"]').should('be.visible')

  })
  //section 3


  //section 4
  it('Seleciona um produto (YouTube) por seu texto', () => {
    
    cy.get('select[id="product"]').select('YouTube')
    cy.get('select[id="product"]').should('have.value', 'youtube')

  })

it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    
    cy.get('select[id="product"]').select('mentoria')
    cy.get('select[id="product"]').should('have.value', 'mentoria')

  })


it('seleciona um produto (Blog) por seu valor índice', () => {
    
    cy.get('select[id="product"]').select(1)
    cy.get('select[id="product"]').should('have.value', 'blog')

  })


  //section 4


  //section 5
it('marca o tipo de atendimento "Feedback"', () => {
    
    cy.get('input[type="radio"][value="feedback"]').check()
    cy.get('input[type="radio"][value="feedback"]').should('be.checked')

  })

it('marca cada tipo de atendimento', () => {
    
    cy.get('input[type="radio"]').each(typeOfService => {
      cy.wrap(typeOfService).check().should('be.checked')
    })
    

  })
  //section 5
it('marca ambos checkboxes, depois desmarca o último', () => {
    
    cy.get('input[type="checkbox"]').check().should('be.checked')
    cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
    
    //cy.get('select[id="product"]').should('have.value', 'blog')

  })

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    
    cy.get('input[type="checkbox"][id="phone-checkbox"]').check()
    cy.get('input[id="phone"]').clear()
    cy.get('button[type="submit"]').click()
    cy.get('span[class="error"]').should('be.visible')
    
    //cy.get('select[id="product"]').should('have.value', 'blog')

  })


  //section 6
it('seleciona um arquivo da pasta fixtures', () => {
    
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
    cy.get('input[type="file"]').should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
    //cy.get('select[id="product"]').should('have.value', 'blog')

  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
    cy.get('input[type="file"]').should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
    //cy.get('select[id="product"]').should('have.value', 'blog')

  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]').selectFile('@sampleFile')
    cy.get('input[type="file"]').should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
    //cy.get('select[id="product"]').should('have.value', 'blog')

  })
  //section 6

  
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    
    cy.contains('a','Política de Privacidade').should('have.attr', 'target', '_blank').and('have.attr', 'href', 'privacy.html')

  }) 

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    
    cy.contains('a','Política de Privacidade').invoke('removeAttr', 'target').click()
    cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')


  })
//section 7


//section 8







//section 8
})

