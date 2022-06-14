let folder = (function(_document, $){

    $document = $(_document);
    //pegar os detalhes da pasta  (Clique da pasta)

    $document.on('click','.folderList', _getFolderDetails);

    function _getFolderDetails(event) {
      event.stopPropagation();

      let folderId = event.currentTarget.getAttribute('data-id');
      let folderName = event.currentTarget.getAttribute('data-name');
      let folder = event.currentTarget.getAttribute('data-folder');
      let boxLetter = localStorage.getItem('boxName').split('CX0000')[1].split('')[0];

      localStorage.setItem('folder', folder);

      documents.getSociosByFolder(folderId);

      $.ajax({
          type: "GET",
          url: "/get-folder-details/"+folderId+"",
          data: {},
          dataType: "json",
          success: function (response) {

            //  console.log('Folder Response: ', response);

              if(response.pasta != undefined){

                  // Append e deleted image
                  home.clearDiv('qr_folder_div');
                  home.addDiv('qr_folder_div', 'qr_code_folder');
                  home.clearDiv('qr_box_div');
                  home.addDiv('qr_box_div', 'qr_code_box');
                  home.centerDiv('qr_code_folder');
                  home.showDetailsDiv();

                  // "<h6 class='text-bold-600 mb-0' style='margin-left: 8px'>QR da Pasta</h6>"+
                  response.pasta.forEach(item => {

                    let departamento =item.Departamento;
                    let tipoDocumento = localStorage.getItem('province');
                    if(departamento ==='ACADEMIA DE POLICIA'){
                        departamento ='ACADEMIA DE POLICIA';
                        if(tipoDocumento==='Instituto Médio De Ciências Policiais'){
                             tipoDocumento ='Instituto Med. Ciênc. Policiais';

                        }

                    }

                    if(departamento ==='GABINETE DO COMANDANTE GERAL'){
                        departamento ='GABINETE CMTE. GERAL';
                        if(tipoDocumento==='Gabinete do Comandante Geral'){
                             tipoDocumento ='Gabinete Cmte. Geral';

                        }
                    }
                    if(departamento ==='GABINETE DE ESTUDOS E REGULAMENTAÇÃO'){
                        departamento ='GAB. EST. REGULAMENTAÇÃO ';
                        if(tipoDocumento==='Gabinete De Estudo e Regulamentação'){
                             tipoDocumento ='Gab. Est. Regulamentação ';

                        }
                    }
                    if(departamento ==='POLICIA DE INTERVENÇÃO RÁPIDA'){
                        departamento ='PIR';
                        if(tipoDocumento==='Comando Da Polícia De Intervenção Rápida'){
                             tipoDocumento ='Comando Pol. Int. Rápida';

                        }
                    }
                    if(departamento ==='POLICIA FISCAL ADUANEIRA'){
                        departamento ='POLICIA FISCAL ADUANEIRA';
                        if(tipoDocumento==='Unidade Fiscal e Aduaneira'){
                             tipoDocumento ='Unidade Fiscal Aduaneira';

                        }
                    }
                    if(departamento ==='POLICIA DE SEGURANÇA DE OBJECTIVOS ESTRATÉGICOS'){
                        departamento ='PSOE';
                        if(tipoDocumento==='Comando Da Unidade De Protecção Objectivos e Económicos'){
                             tipoDocumento ='CUPOE';

                        }
                    }
                    if(departamento ==='POLICIA DE GUARDA FRONTEIRAS'){
                        departamento ='POLICIA GUARDA FRONTEIRAS';
                        if(tipoDocumento==='Polícia De Guarda Fronteira'){
                             tipoDocumento ='Policia da Guarda Fronteiras';

                        }
                    }
                    if(departamento ==='POLICIA DE SEGURANÇA PESSOAL E DE ENTIDADES PROTOCOLARES'){
                        departamento ='PSPEP';
                        if(tipoDocumento==='Polícia De Segurança Pessoal e De Entidades Protocolares'){
                             tipoDocumento ='PSPEP';

                        }
                    }
                    if(departamento ==='CENTRO DE FORMAÇÃO E ADESTRAMENTO DE CAVALARIA E CINOTECNIA'){
                        departamento ='CENTRO F.A.C. CINOTECNIA';
                        if(tipoDocumento==='Polícia Montada'){
                             tipoDocumento ='Polícia Montada';

                        }
                    }
                    if(departamento ==='INSTITUTO SUPERIOR DE CIÊNCIAS POLICIAIS E CRIMINAIS'){
                        departamento ='INSTITUTO S.C.P. CRIMINAIS';
                        if(tipoDocumento==='Instituto Superior De Ciências Policiais E Criminais'){
                             tipoDocumento ='Instituto S.C.P. Criminais';

                        }
                    }
                    if(departamento ==='ESCOLA PRÁTICA DE POLICIA'){
                        departamento ='ESCOLA PRÁTICA POLICIA';
                        if(tipoDocumento==='Escola De Proteção e Intervenção'){
                             tipoDocumento ='Escola Protec. Intervenção';

                        }
                    }
                    if(departamento ==='DIRECÇÃO DE SEGURANÇA PÚBLICA E OPERAÇÕES'){
                        departamento ='DIRECÇÃO SEG. P. OPERAÇÕES';
                        if(tipoDocumento==='Departamento De Armas E Explosivos'){
                             tipoDocumento ='Depart. Armas e Explosivos';

                        }else{
                            if(tipoDocumento==='Direcção Nacional De Ordem Pública'){
                                tipoDocumento ='Direcção Nac. Ord. Pública';
                            }else{
                                if(tipoDocumento==='Posto Do Comando Central'){
                                    tipoDocumento ='Posto Comando Central';
                                }
                            }
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE COMUNICAÇÃO INSTITUCIONAL E IMPRENSA'){
                        departamento ='DIRECÇÃO COM. I. IMPRENSA';
                        if(tipoDocumento==='Gabinete De Comunicação e Imagem'){
                             tipoDocumento ='Gabinete Com. Imagem';

                        }
                    }
                    if(departamento ==='GABINETE DE PUREZA INTERNA'){
                        departamento ='GABINETE PUREZA INTERNA';
                        if(tipoDocumento==='Gabinete De Pureza Interna'){
                             tipoDocumento ='Gabinete Pureza Interna';

                        }
                    }
                    if(departamento ==='INSPECÇÃO DA POLICIA NACIONAL DE ANGOLA'){
                        departamento ='INSPECÇÃO DA PNA';

                    }
                    if(departamento ==='GABINETE DO SEGUNDO COMANDANTE'){
                        departamento ='GABINETE 2º COMANDANTE';
                        if(tipoDocumento==='Gabinete do 2º Comandante'){
                             tipoDocumento ='Gabinete do 2º Comandante';

                        }
                    }
                    if(departamento ==='DIRECÇÃO DE INFORMAÇÕES POLICIAIS'){
                        departamento ='DIRECÇÃO INF. POLICIAIS';
                        if(tipoDocumento==='Direcção Nacional De Registos E Informações'){
                             tipoDocumento ='Direcção Nac. R. Informações';

                        }
                    }
                    if(departamento ==='DIRECÇÃO DE FINANÇAS'){
                        departamento ='DIRECÇÃO DE FINANÇAS';
                        if(tipoDocumento==='Direcção Nacional De Planeamento E Finanças'){
                             tipoDocumento ='Direcção Nac. Plan. Finanças';

                        }else{
                            if(tipoDocumento==='Complexo Residencial Imbondeiro'){
                                tipoDocumento ='Complexo Res. Imbondeiro';
                            }
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE LOGISTICA'){
                        departamento ='DIRECÇÃO DE LOGISTICA';
                        if(tipoDocumento==='Direcção Nacional De Logistica'){
                             tipoDocumento ='Direcção Nac. Logistica';

                        }
                    }
                    if(departamento ==='DIRECÇÃO DE INFRAESTRUTURA E EQUIPAMENTOS'){
                        departamento ='DIRECÇÃO I.E. EQUIPAMENTOS';
                        if(tipoDocumento==='Gabinete Técnico'){
                             tipoDocumento ='Gabinete Técnico';

                        }
                    }
                    if(departamento ==='DIRECÇÃO DE ADMINISTRAÇÃO E SERVIÇOS'){
                        departamento ='DIRECÇAÕ ADM.  SERVIÇOS';
                        if(tipoDocumento==='Secretaria Geral'){
                            tipoDocumento ='Secretaria Geral';

                        }else{
                            if(tipoDocumento==='Serviços Sociais'){
                                tipoDocumento ='Serviços Sociais';
                            }else{
                                if(tipoDocumento==='Gabinete De Protocolo e Relações Públicas'){
                                    tipoDocumento ='Gabinete Prot. Rel. Publicas';
                                }
                            }
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE ACESSORIA JURÍDICA'){
                        departamento ='DIRECÇÃO ACESS. JURÍDICA';
                        if(tipoDocumento==='Gabinete De Acessoria Juridica'){
                             tipoDocumento ='Gabinete Acessoria Jurídica';

                        }
                    }
                    if(departamento ==='DIRECÇÃO DE EDUCAÇÃO PATRIÓTICA'){
                        departamento ='DIRECÇÃO EDUC. PATRIÓTICA';
                        if(tipoDocumento==='Departamento Nacional De Educação Moral Cívica'){
                             tipoDocumento ='Dep. Nac.Educ. Moral Civica';

                        }
                    }
                    if(departamento ==='DIRECÇÃO DE TRANSITO E SEGURANÇA RODOVIÁRIA'){
                        departamento ='DIRECÇÃO T. S. RODOVIARIA';
                        if(tipoDocumento==='Direcção Nacional De Viação e Transito'){
                             tipoDocumento ='Direcção Nac. Viac. Trânsito';
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE PESSOAL E QUADROS'){
                        departamento ='DIRECÇÃO PESSOAL QUADROS';
                        if(tipoDocumento==='Direcção Nacional De Recursos Humanos'){
                             tipoDocumento ='Direcção Nac. Rec. Humanos';
                        }else{
                            if(tipoDocumento==='Formação De Comando'){
                                tipoDocumento ='Formação De Comando';
                            }
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE TELECOMUNICAÇÕES E TECNOLOGIAS DE INFOMAÇÃO'){
                        departamento ='DIRECÇÃO T.T. INFORMAÇÃO';
                        if(tipoDocumento==='Direcçao Provincial De Telecomunicações e Informática'){
                            tipoDocumento ='Direcção Prov.Tel. Informatica';
                        }else{
                            if(tipoDocumento==='Direcção Nacional De Comunicações'){
                                tipoDocumento ='Direcção Nac. Comunicação';
                            }else{
                                if(tipoDocumento==='Departamento Nacional De Informática'){
                                    tipoDocumento ='Depart. Nac. Informatica';
                                }
                            }
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE TRANSPORTES'){
                        departamento ='DIRECÇÃO DE TRANSPORTES';
                        if(tipoDocumento==='Departamento Nacional De Transporte'){
                             tipoDocumento ='Departamento N. Transporte';
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE SERVIÇOS DE SAÚDE'){
                        departamento ='DIRECÇÃO SERVIÇOS DE SAÚDE';
                        if(tipoDocumento==='Departamento De Saúde'){
                             tipoDocumento ='Departamento De Saúde';
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE ESTUDOS E PLANEAMENTO'){
                        departamento ='DIRECÇÃO EST. PLANEAMENTO';
                        if(tipoDocumento==='Gabinete De Estudos Informação e Análise'){
                             tipoDocumento ='Gab. De Estudos Inf. E Analise';
                        }
                    }
                    if(departamento ==='COMANDO PROVINCIAL DE LUANDA'){
                        departamento ='COMANDO PROV. LUANDA';
                        if(tipoDocumento==='Departamento Provincial De Investigação Criminal'){
                             tipoDocumento ='Depart. Prov. Invest. Criminal';
                        }
                    }
                    if(departamento ==='SERVIÇO DE INVESTIGAÇÃO CRIMINAL'){
                        departamento ='SIC';
                        if(tipoDocumento==='Direcção Nacional De Investigação Criminal'){
                             tipoDocumento ='Direcção Nac. Invest. Criminal';
                        }
                    }
                    if(departamento ==='GRUPO DESPORTIVO INTERCLUBE'){
                        departamento ='GRUPO DESP. INTERCLUBE';
                        if(tipoDocumento==='Interclube'){
                             tipoDocumento ='Interclube';
                        }
                    }
                    if(departamento ==='COFRE DE PREVIDENCIA DO PESSOAL DA POLICIA NACIONAL'){
                        departamento ='CPPPN';
                        if(tipoDocumento==='Cofre De Previdência Do Pessoal Da Polícia Nacional'){
                             tipoDocumento ='CPPPN';
                        }
                    }
                    if(departamento ==='DIRECÇÃO DE DOUTRINA E ENSINO POLICIAL'){
                        departamento ='DIRECÇÃO DOUT. E. POLICIAL';
                        if(tipoDocumento==='Doutrina Policial'){
                             tipoDocumento ='Doutrina Policial';
                        }
                    }


                      $('#qr_code_folder').append(


                          "<div id='doc-infoContent' class='col-md-12' data-type='folder-content'>"+
                              "<div class='form-group row'>"+
                                      "<div class='col-md-12 d-flex justify-content-center'>"+
                                          "<img class='img-thumbnail bg-transparent border-0' src='/assets/img/CPPPN.jpg' alt='codigo_qr' style='max-width: 30% !important;'>"+
                                      "</div>"+
                              "</div>"+
                              "<div class='form-group row form-group-flex'>"+
                                      "<div class='input-group mt-0 input-border'>"+
                                        //   "<div class='input-group-prepend w-10'>"+
                                        //           "<span class='input-group-text bg-white border-right-0 input-font-bolder'>Orgão:</span>"+
                                        //   "</div>"+
                                          "<input type='text' id='orgao' class='form-control border-left-0 bg-white input-font-bolder1' placeholder='' name='orgao' value='"+departamento+"' readonly>"+
                                      "</div>"+
                                  "</div>"+
                              "<div class='form-group row form-group-flex'>"+
                                      "<div class='input-group mt-0 input-border'>"+
                                        //   "<div class='input-group-prepend w-10'>"+
                                        //           "<span class='input-group-text bg-white border-right-0 input-font-bolder'>Documento:</span>"+
                                        //   "</div>"+
                                          "<input type='text' id='orgao' class='form-control border-left-0 bg-white input-font-bolder1' placeholder='' name='orgao' value='"+tipoDocumento+"' readonly>"+
                                      "</div>"+
                                  "</div>"+
                                  "<div class='form-group row form-group-flex'>"+
                                      "<div class='input-group mt-0 input-border'>"+
                                          "<div class='input-group-prepend w-10'>"+
                                                  "<span class='input-group-text bg-white border-right-0 input-font-bolder'>Pasta Nº:</span>"+
                                          "</div>"+
                                          "<input type='text' id='folder_num' class='form-control border-left-0 bg-white input-font-bolder' placeholder='' name='folder_num' value='"+item.designacao+"' readonly>"+
                                      "</div>"+
                                  "</div>"+
                                  "<div class='form-group row form-group-flex'>"+
                                      "<div class='input-group mt-0 input-border'>"+
                                          "<div class='input-group-prepend w-10'>"+
                                              "<span class='input-group-text bg-white border-right-0 input-font-bolder'>Caixa Nº:</span>"+
                                          "</div>"+
                                          "<input type='text' id='box_num' class='form-control border-left-0 bg-white input-font-bolder' placeholder='' name='box_num' value='"+localStorage.getItem('boxName')+"' readonly>"+
                                      "</div>"+
                                  "</div>"+
                                  "<div class='form-group row form-group-flex'>"+
                                      "<div class='input-group mt-0 input-border'>"+
                                          "<div class='input-group-prepend w-30'>"+
                                                  "<span class='input-group-text bg-white border-right-0 input-font-bolder'>Letra:</span>"+
                                          "</div>"+
                                          "<input type='text' id='letra' class='form-control border-left-0 bg-white input-font-bolder' placeholder='' name='letra' value='"+boxLetter+"' readonly>"+
                                      "</div>"+
                                  "</div>"+
                                  "<div class='form-group row'>"+
                                      "<div class='col-md-12 d-flex justify-content-center'>"+
                                          "<img class='img-thumbnail' src='"+item.codigoQr+"' alt='codigo_qr'>"+
                                      "</div>"+
                                  "</div>"+
                          "</div>"
                          );
                  })
              }
          },
          error: function (response) {
              console.log(response);
          }
      });
    }

})(Document, jQuery);