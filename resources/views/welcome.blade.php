@extends ('layouts/principal')

@section('conteudo')

          <!-- BEGIN: Content-->
          <div class="app-content content h-100">
            <div class="content-overlay"></div>
            <!-- BEGIN: OVERLAY DA PESQUISA GLOBAL-->
            <div id="sgq-global-searchBar-overlayer" class="h-100">
                <div class="row w-100 m-0 position-relative vertical-scroll ps h-100" style="padding: 18px">
                    <div class="col" style="padding-left: 70px;">
                        <div class="sgq-gSB-results card border-bottom-info border-top-info animated fadeOutDown" style="min-height: 420px; width: 540px !important;">
                            <span class="sgq-gSB-results-overlay position-absolute w-100 h-100 rounded d-flex justify-content-start align-items-center flex-column" sgq-data-handle-overlay="show" style="padding-top: 20%">
                                <span class="la la-search text-info" style="font-size: 8rem;"></span>
                                <h2 class="sgq-gSB--searchBar-overlayer-returned-text p-2 text-center">Insira algum Termo de Pesquisa <br> para obter os seus resultados.</h2>
                            </span>
                            <div class="card-header">
                                <h4 class="card-title">Resultados da Pesquisa</h4>
                                <a class="heading-elements-toggle"><i class="la la-ellipsis-v font-medium-3"></i></a>
                                <div id="sgq-gSB-select-limit" sgq-data-selected-limit="6" class="heading-elements">
                                    <div class="input-group input-group-sm">
                                        <div class="d-inline-block pr-1">
                                            Limite:
                                        </div>
                                        <div class="d-inline-block custom-control custom-radio mr-1">
                                            <input id="sgqGSBSelectLimit6" sgq-data-limit="6" type="radio" name="inlineRadio" class="custom-control-input" checked>
                                            <label class="custom-control-label" for="sgqGSBSelectLimit6">6</label>
                                        </div>
                                        <div class="d-inline-block custom-control custom-radio mr-1">
                                            <input id="sgqGSBSelectLimit12" sgq-data-limit="12" type="radio" name="inlineRadio" class="custom-control-input">
                                            <label class="custom-control-label" for="sgqGSBSelectLimit12">12</label>
                                        </div>
                                        <div class="d-inline-block custom-control custom-radio mr-1">
                                            <input id="sgqGSBSelectLimit24" sgq-data-limit="24" type="radio" name="inlineRadio" class="custom-control-input">
                                            <label class="custom-control-label" for="sgqGSBSelectLimit24">24</label>
                                        </div>
                                        <div class="d-inline-block custom-control custom-radio">
                                            <input id="sgqGSBSelectLimitAll" sgq-data-limit="150" type="radio" name="inlineRadio" class="custom-control-input">
                                            <label class="custom-control-label" for="sgqGSBSelectLimitAll">Todos</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="card-body pt-0">
                                    <ul class="nav nav-tabs nav-underline">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="baseIcon-tab21" data-toggle="tab" aria-controls="tabIcon21" href="#tabIcon21" aria-expanded="true"><i class="la la-hdd-o"></i> Tudo </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="baseIcon-tab22" data-toggle="tab" aria-controls="tabIcon22" href="#tabIcon22" aria-expanded="false"><i class="la la-archive"></i> Caixas </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="baseIcon-tab23" data-toggle="tab" aria-controls="tabIcon23" href="#tabIcon23" aria-expanded="false"><i class="la la-folder-open"></i> Pastas </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="baseIcon-tab24" data-toggle="tab" aria-controls="tabIcon24" href="#tabIcon24" aria-expanded="false"><i class="la la-file-text"></i> Documentos </a>
                                        </li>
                                    </ul>
                                    <div class="tab-content position-relative w-100 pb-1 pt-1">
                                        <div role="tabpanel" class="tab-pane active" id="tabIcon21" aria-expanded="true" aria-labelledby="baseIcon-tab21">
                                            <p>Resultados da Pesquisa Global de Documentos, Pastas e Caixas</p>
                                            <div class="row">
                                                <div id="sgq-gSB-returned-results" sgq-data-returned="boxes" class="col-12">
                                                    <h4><strong class="sgq-results-count">0</strong> <span class="sgq-results-limit">de 6</span> Caixas requisitadas encontradas</h4>
                                                    <div id="sgq-gSB-returned-results-box" class="row">
                                                    </div>
                                                </div>

                                                <div id="sgq-gSB-returned-results" sgq-data-returned="folders" class="col-12 pt-1">
                                                    <h4><strong class="sgq-results-count">0</strong> <span class="sgq-results-limit">de 6</span> Pastas requisitadas encontradas</h4>
                                                    <div id="sgq-gSB-returned-results-box" class="row">
                                                    </div>
                                                </div>

                                                <div id="sgq-gSB-returned-results" sgq-data-returned="documents" class="col-12 pt-1">
                                                    <h4><strong class="sgq-results-count">0</strong> <span class="sgq-results-limit">de 6</span> Documentos requisitadas encontrados</h4>
                                                    <div id="sgq-gSB-returned-results-box" class="row">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="sgq-gSB-returned-results-boxes tab-pane" id="tabIcon22" aria-labelledby="baseIcon-tab22">
                                            <p>Resultados da Pesquisa Global das Caixas</p>
                                            <h4><strong class="sgq-results-count">0</strong> <span class="sgq-results-limit">de 6</span> Caixas requisitadas encontradas</h4>
                                            <div id="sgq-gSB-returned-results-box" class="row">
                                            </div>
                                        </div>
                                        <div class="sgq-gSB-returned-results-folders tab-pane" id="tabIcon23" aria-labelledby="baseIcon-tab23">
                                            <p>Resultados da Pesquisa Global das Pastas</p>
                                            <h4><strong class="sgq-results-count">0</strong> <span class="sgq-results-limit">de 6</span> Pastas requisitadas encontradas</h4>
                                            <div id="sgq-gSB-returned-results-box" class="row">
                                            </div>
                                        </div>
                                        <div class="sgq-gSB-returned-results-documents tab-pane" id="tabIcon24" aria-labelledby="baseIcon-tab24">
                                            <p>Resultados da Pesquisa Global dos Documentos</p>
                                            <h4><strong class="sgq-results-count">0</strong> <span class="sgq-results-limit">de 6</span> Documentos requisitados encontrados.</h4>
                                            <div id="sgq-gSB-returned-results-box" class="row">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="sgq-gSB-history card border-top-info animated fadeOutRight" style="min-height: 68px;z-index: -1;">
                            <div class="card-header">
                                <h4 class="card-title">Histórico de Pesquisa</h4>
                                <a class="heading-elements-toggle"><i class="la la-ellipsis-v font-medium-3"></i></a>
                                <div class="heading-elements">
                                    <ul class="list-inline mb-0">
                                        <li><a data-action="collapse"><i class="ft-minus"></i></a></li>
                                        <li><a data-action="reload"><i class="ft-rotate-cw"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-content collapse show">
                                <div class="list-group">
                                    <span class="list-group-item">Documento: António Kwanzambi (PT000002, CX0000A1, BGL)</span>
                                    <span class="list-group-item">Caixa: CX000A48 (BGL)</span>
                                    <span class="list-group-item">Documento: Manuel Fernandes (PT000987, CX00A145, LDA)</span>
                                    <span class="list-group-item">Pasta: PT001045 da Caixa CX000A45 (BLG)</span>
                                    <span class="list-group-item">Documento: Pedro Quintas (PT000001, CX0000P1, BGL)</span>
                                    <span class="list-group-item">Pasta: PT000001 da Caixa CX0000A1 (LDA)</span>
                                    <span class="list-group-item">Pasta: PT0000011 da Caixa CX0000A3 (UIG)</span>
                                    <span class="list-group-item">Documento: Kiame Kwesseka (PT000001, CX0000K1, CBD)</span>
                                    <span class="list-group-item">Caixa: CX000A48 (LBG)</span>
                                    <span class="list-group-item">Documento: Felíciana Kembo (PT000008, CX0000F1, BGL)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END: OVERLAY DA PESQUISA GLOBAL-->

            <div class="content-wrapper ">
                <div class="content-header row">
                </div>
                <div class="content-body">
                    <div class="row" id="box-row">
                        <div class="col-12 col-xl-4">
                            <div class="card-header">
                                <h4 class="card-title position-relative">
                                    <span class="position-relative">Animais</span>
                                    <div class="form-control-position" style="top: -9px !important; cursor: pointer;" id="refreshBoxes">
                                        <i class="ft-refresh-ccw font-medium-4" title="Atualizar"></i>
                                    </div>
                                    <span class="position-relative badge badge-info badge-pill ml-1" id="totalProvince"></span>


                                </h4>
                            </div>
                            <div class="form-group position-relative mt-1">
                                <input type="text" class="form-control form-control-lg input-lg mb-1" id="boxSearch" placeholder="Pesquisar Animais">
                                <div class="form-control-position">
                                    <label for="boxSearch"><i class="icon-magnifier danger font-medium-4"></i></label>
                                </div>
                            </div>
                            <br>
                            <div id="accordionCryptoTypes" role="tablist" aria-multiselectable="true">
                                <div id="province_boxes"></div>

                            </div>

                            <div class="loader-wrapper hidden">
                                <div class="loader-container">
                                    <div class="fading-circle loader-blue-grey">
                                        <div class="circle1 circle"></div>
                                        <div class="circle2 circle"></div>
                                        <div class="circle3 circle"></div>
                                        <div class="circle4 circle"></div>
                                        <div class="circle5 circle"></div>
                                        <div class="circle6 circle"></div>
                                        <div class="circle7 circle"></div>
                                        <div class="circle8 circle"></div>
                                        <div class="circle9 circle"></div>
                                        <div class="circle10 circle"></div>
                                        <div class="circle11 circle"></div>
                                        <div class="circle12 circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-12 col-xl-4">
                            <div class="card-header">
                                <h4 class="card-title">
                                    <span class="position-relative">Caracteristicas</span>
                                    <div class="form-control-position" style="top: 13px !important; right: 36px !important; cursor: pointer;" id="refreshDocs">
                                        <i class="ft-refresh-ccw font-medium-4" title="Atualizar"></i>
                                    </div>
                                    <span class="position-relative badge badge-info badge-pill ml-1" id="totalDocs"></span>
                                </h4>
                            </div>
                            <div class="form-group position-relative mt-1">
                                <input type="text" class="form-control form-control-lg input-lg mb-1" id="docSearch" placeholder="Pesquisar Caracteristicas">
                                <div class="form-control-position">
                                    <label for="docSearch"><i class="icon-magnifier danger font-medium-4"></i></label>
                                </div>
                            </div>
                            <br>
                            <div id="accordionCrypto" role="tablist" aria-multiselectable="true">
                                <div id="boxes"></div>
                            </div>
                        </div>

                        <div class="col-12 col-xl-4 text-center">
                            <div class="card-header">
                                <h4 class="card-title">Detalhes</h4>
                            </div>
                            <br>
                            <div id="accordionCryptoDocs" role="tablist" aria-multiselectable="true">
                                <div id="docs"></div>
                            </div>

                            <div class="card details-card hidden">
                                {{--  DETAILS CONTENT HERE  --}}
                                <div class="card-content">
                                    <div class="card-body pt-0 pb-0">
                                        <div class="tab-content px-1 pt-1">
                                            <div role="tabpanel" class="tab-pane active" id="limit" aria-expanded="true" aria-labelledby="base-limit">
                                                <div class="row" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">

                                                    {{--  QR CODE Details  --}}
                                                    <div class="col-12 col-xl-12 pl-0 p-0" >
                                                        <div class="row" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                                                            <div class="col-12" id="qr_box_div">
                                                                <div id="qr_code_box" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">

                                                                </div>
                                                            </div>
                                                            <div class="col-12" id="qr_folder_div">
                                                                <div id="qr_code_folder">

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="button" class="btn btn-info hidden" id="print-card"><i class="ft-printer large"></i>Imprimir</button>
                        </div>

                        <div class="col-12 col-xl-6 hidden">
                            <div class="card">
                                <div class="card-header col-6">
                                    <h4 class="card-title">Detalhes da Caixa</h4>
                                </div>
                                {{--  DETAILS CONTENT HERE  --}}
                                <div class="card-content">
                                    <div class="card-body">
                                        <div class="tab-content px-1 pt-1">
                                            <div role="tabpanel" class="tab-pane active" id="limit" aria-expanded="true" aria-labelledby="base-limit">
                                                <div class="row">
                                                    {{--  Basic Information  --}}
                                                    <div class="col-12 col-xl-8 pr-2">
                                                        <div class="form form-horizontal">
                                                            <div class="form-body">
                                                                <div id="details_div">
                                                                    <div id="details"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {{--  QR CODE Details  --}}
                                                    <div class="col-12 col-xl-4 pl-2 p-0" >
                                                        <div class="row">
                                                            <div class="col-6" id="qr_box_div">
                                                                <div id="qr_code_box">

                                                                </div>
                                                            </div>
                                                            <div class="col-6" id="qr_folder_div">
                                                                <div id="qr_code_folder">

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="market" aria-labelledby="base-market">
                                                <div class="row">
                                                    <div class="col-12 col-xl-6 border-right-blue-grey border-right-lighten-4">
                                                        <div class="row my-2">
                                                            <div class="col-4">
                                                                <h5 class="text-bold-600 mb-0">Buy BTC</h5>
                                                            </div>
                                                            <div class="col-8 text-right">
                                                                <p class="text-muted mb-0">USD Balance: $ 5000.00</p>
                                                            </div>
                                                        </div>
                                                        <form class="form form-horizontal">
                                                            <div class="form-body">
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 col-form-label" for="btc-market-buy-price">Price</label>
                                                                    <div class="col-md-9">
                                                                        <input type="number" disabled id="btc-market-buy-price" class="form-control" placeholder="Market prise $" name="btc-market-buy-price">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 col-form-label" for="btc-market-buy-amount">Amount</label>
                                                                    <div class="col-md-9">
                                                                        <input type="number" id="btc-market-buy-amount" class="form-control" placeholder="0.026547 BTC" name="btc-market-buy-amount">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <div class="col-md-3"></div>
                                                                    <div class="col-md-9">
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">25%</button>
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">50%</button>
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">75%</button>
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">100%</button>
                                                                    </div>
                                                                </div>
                                                                <div class="form-actions pb-0">
                                                                    <button type="submit" class="btn round btn-success btn-block btn-glow">
                                                                        Buy BTC </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div class="col-12 col-xl-6 pl-2 p-0">
                                                        <div class="row my-2">
                                                            <div class="col-4">
                                                                <h5 class="text-bold-600 mb-0">Sell BTC</h5>
                                                            </div>
                                                            <div class="col-8 text-right">
                                                                <p class="text-muted mb-0">BTC Balance: 1.2654898</p>
                                                            </div>
                                                        </div>
                                                        <form class="form form-horizontal">
                                                            <div class="form-body">
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 col-form-label" for="btc-mrk-price">Price</label>
                                                                    <div class="col-md-9">
                                                                        <input type="number" disabled id="btc-mrk-price" class="form-control" placeholder="Market prise $" name="btc-market-sell-price">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 col-form-label" for="btc-market-sell-amount">Amount</label>
                                                                    <div class="col-md-9">
                                                                        <input type="number" id="btc-market-sell-amount" class="form-control" placeholder="0.026547 BTC" name="btc-market-sell-amount">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <div class="col-md-3"></div>
                                                                    <div class="col-md-9">
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">25%</button>
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">50%</button>
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">75%</button>
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">100%</button>
                                                                    </div>
                                                                </div>
                                                                <div class="form-actions pb-0">
                                                                    <button type="submit" class="btn round btn-danger btn-block btn-glow">
                                                                        Sell BTC </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="stop-limit" aria-labelledby="base-stop-limit">
                                                <div class="row">
                                                    <div class="col-12 col-xl-6 border-right-blue-grey border-right-lighten-4">
                                                        <div class="row my-2">
                                                            <div class="col-4">
                                                                <h5 class="text-bold-600 mb-0">Buy BTC</h5>
                                                            </div>
                                                            <div class="col-8 text-right">
                                                                <p class="text-muted mb-0">USD Balance: $ 5000.00</p>
                                                            </div>
                                                        </div>
                                                        <form class="form form-horizontal">
                                                            <div class="form-body">
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 col-form-label" for="btc-stop-buy">Stop</label>
                                                                    <div class="col-md-9">
                                                                        <input type="number" id="btc-stop-buy" class="form-control" placeholder="$ 11916.9" name="btc-stop-buy">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 col-form-label" for="btc-stop-buy-limit">Limit</label>
                                                                    <div class="col-md-9">
                                                                        <input type="number" id="btc-stop-buy-limit" class="form-control" placeholder="$ 12000.0" name="btc-stop-buy-limit">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 col-form-label" for="btc-stop-buy-amount">Amount</label>
                                                                    <div class="col-md-9">
                                                                        <input type="number" id="btc-stop-buy-amount" class="form-control" placeholder="0.026547 BTC" name="btc-stop-buy-amount">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <div class="col-md-3"></div>
                                                                    <div class="col-md-9">
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">25%</button>
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">50%</button>
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">75%</button>
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">100%</button>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 col-form-label" for="btc-stop-buy-total">Total</label>
                                                                    <div class="col-md-9">
                                                                        <input type="number" disabled id="btc-stop-buy-total" class="form-control" placeholder="$ 318.1856" name="btc-stop-buy-total">
                                                                    </div>
                                                                </div>
                                                                <div class="form-actions pb-0">
                                                                    <button type="submit" class="btn round btn-success btn-block btn-glow">
                                                                        Buy BTC </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div class="col-12 col-xl-6 pl-2 p-0">
                                                        <div class="row my-2">
                                                            <div class="col-4">
                                                                <h5 class="text-bold-600 mb-0">Sell BTC</h5>
                                                            </div>
                                                            <div class="col-8 text-right">
                                                                <p class="text-muted mb-0">BTC Balance: 1.2654898</p>
                                                            </div>
                                                        </div>
                                                        <form class="form form-horizontal">
                                                            <div class="form-body">
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 col-form-label" for="btc-stop-sell">Stop</label>
                                                                    <div class="col-md-9">
                                                                        <input type="number" id="btc-stop-sell" class="form-control" placeholder="$ 11916.9" name="btc-stop-sell">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 col-form-label" for="btc-stop-sell-limit">Limit</label>
                                                                    <div class="col-md-9">
                                                                        <input type="number" id="btc-stop-sell-limit" class="form-control" placeholder="$ 12000.0" name="btc-stop-sell-limit">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 col-form-label" for="btc-stop-sell-amount">Amount</label>
                                                                    <div class="col-md-9">
                                                                        <input type="number" id="btc-stop-sell-amount" class="form-control" placeholder="0.026547 BTC" name="btc-stop-sell-amount">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <div class="col-md-3"></div>
                                                                    <div class="col-md-9">
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">25%</button>
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">50%</button>
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">75%</button>
                                                                        <button type="button" class="btn round btn-outline-secondary btn-sm">100%</button>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 col-form-label" for="btc-stop-sell-total">Total</label>
                                                                    <div class="col-md-9">
                                                                        <input type="number" disabled id="btc-stop-sell-total" class="form-control" placeholder="$ 318.1856" name="btc-stop-sell-total">
                                                                    </div>
                                                                </div>
                                                                <div class="form-actions pb-0">
                                                                    <button type="submit" class="btn round btn-danger btn-block btn-glow">
                                                                        Sell BTC </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    {{--  FORM REGISTER ANIMAL  --}}

                    <div class="content-wraper hidden" id="animal-container">
                        <div class="page-header">
                          <h3 class="page-title">
                              Formulário do Animal
                          </h3>

                        </div>
                        <div class="row">
                            <div class="col-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Dados do Animal</h4>
                                        <p class="card-description"></p>
                                        <form class="forms-sample" id="animal-form" method="POST" >
                                            @csrf
                                            <div class="form-group">
                                                <label for="exampleInputName1">Nome Científico</label>
                                                <input type="text" class="form-control {{$errors->has('nome_cientifico') ? 'is-invalid' : ''}}" id="nome_cientifico" name="nome_cientifico" placeholder="Nome Cientifico">
                                                @if($errors->has('nome_cientifico'))
                                                    <div class="invalid-feedback">
                                                        {{$errors->first('nome_cientifico')}}
                                                    </div>
                                                @endif
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputName1">Nome Vulgar</label>
                                                <input type="text" class="form-control {{$errors->has('nome_vulgar') ? 'is-invalid' : ''}}" id="nome_vulgar" name="nome_vulgar"placeholder="Nome Vulgar">
                                                @if($errors->has('nome_vulgar'))
                                                    <div class="invalid-feedback">
                                                        {{$errors->first('nome_vulgar')}}
                                                    </div>
                                                 @endif
                                            </div>

                                            <div class="form-group col-md-12 grid-margin stretch-card ">
                                                <label for="exampleSelectGender">Especie</label>
                                                <select class="form-control {{$errors->has('especie') ? 'is-invalid' : ''}}"  id="especie" name="especie">
                                                    <option value="">Selecione a especie</option>
                                                    
                                                </select>
                                                @if($errors->has('especie'))
                                                    <div class="invalid-feedback">
                                                        {{$errors->first('especie')}}
                                                    </div>
                                                @endif
                                            </div>
                                            <div class="form-actions">
                                                <button type="submit" class="btn btn-success" id="validate-btn">
                                                    <i class="la la-check-square-o"></i> Salvar
                                                </button>
                                                <button type="button" class="btn btn-danger mr-1 " data-dismiss="modal">
                                                    <i class="ft-x"></i> Cancelar
                                                </button>
                                            </div>

                                            {{-- <button type="submit" class="btn btn-primary mr-2">Registar</button>
                                            <button class="btn btn-light">Cancelar</button> --}}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>





                    {{--  DOCUMENT MODAL  --}}
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="form-group">
                            <!-- Modal -->
                            <div class="modal fade text-left" id="xlarge" tabindex="-1" role="dialog" aria-labelledby="myModalLabel16" aria-hidden="true">
                                <div class="modal-dialog modal-xl center-modal" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title" id="myModalLabel16">Validar Documento</h4>
                                            <button type="button" class="close resetSocioStatus" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-12 col-xl-4">
                                                    <form class="form form-horizontal" id="form-validate" data-form-val="">

                                                        <div class="form-body" id="digitalized-doc-info">
                                                            <h4 class="form-section"><i class="ft-clipboard"></i> Informações do Documento</h4>
                                                        </div>

                                                        <div id='doc-infoContent' class="form__validate__doc__fields">
                                                            <div class='form-group row'>
                                                                <div class="col-12"><label class='col-md-12' for='NomeAssociado'>Nome Associado</label><input type='text' id='NomeAssociado' class='form-control' name='NomeAssociado' value=''  required></div>
                                                            </div>

                                                            <div class='form-group row'>
                                                                <div class="col-12"><label class='col-md-12' for='NumeroInscricao'>Nº Inscrição</label><input type='number' id='NumeroInscricao' class='form-control' name='NumeroInscricao' value=''></div>
                                                            </div>

                                                            <div class='form-group row'>
                                                                <div class="col-12"><label class='col-md-12' for='NBi'>Nº BI</label><input type='text' id='NBi' class='form-control' name='NBi' value=''></div>
                                                            </div>

                                                            <div class='form-group row'>
                                                                <div class="col-12"><label class='col-md-12' for='Orgao'>Org&atilde;o</label><input type='text' id='Orgao' class='form-control' name='Orgao' value=''></div>
                                                            </div>

                                                            <div class='form-group row'>
                                                                <div class="col-12"><label class='col-md-12' for='NomePai'>Nome do Pai</label><input type='text' id='NomePai' class='form-control' name='NomePai' value=''></div>
                                                            </div>

                                                            <div class='form-group row'>
                                                                <div class="col-12"><label class='col-md-12' for='NomeMae'>Nome da M&atilde;e</label><input type='text' id='NomeMae' class='form-control' name='NomeMae' value=''></div>
                                                            </div>

                                                        </div>

                                                        {{--  Validation btn  --}}
                                                        <div class="dropdown show form-group row col-md-2">
                                                            <div class="dropdown-menu show dropdown-demo" style="height: 55px !important;">
                                                                <div class="dropdown-item">
                                                                    <span class="float-right">
                                                                        <input type="checkbox" name="switchery" id="switchery2" class="switchery-xs"/>
                                                                        <span class="danger mb-1">*</span>
                                                                    </span>
                                                                    <label for="switchery2" class="card-title">Validado</label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="form-actions">
                                                            <button type="submit" class="btn btn-info" id="validate-btn">
                                                                <i class="la la-check-square-o"></i> Salvar
                                                            </button>
                                                            <button type="button" class="btn btn-danger mr-1 resetSocioStatus" data-dismiss="modal">
                                                                <i class="ft-x"></i> Cancelar
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="col-12 col-xl-8">
                                                    {{--  iframe pdf  --}}
                                                    <div id="iframeMain" class="col-12">
                                                        <div id="iframeContent" class="col-12" style="height: 46vh;">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                       {{--  Tablbe USER REGISTRED --}}

                    <div class="container hidden" id="user-container">
                        <div class="row match-height">
                            <div class="col-xl-12 col-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title">Utilizadores</h4>
                                        <a class="heading-elements-toggle"><i class="la la-ellipsis-v font-medium-3"></i></a>
                                        <div class="heading-elements" id="addUser-modal">
                                            <span class="h4" data-toggle="modal" data-target="#xlarge-user"><i class="ft-plus-circle info" title="Adicionar"></i> Adicionar</span>
                                        </div>
                                    </div>
                                    <div class="card-content">
                                        <div class="table-responsive">
                                            <table class="table table-striped table-bordered" id="user-table" width="100%">
                                                <thead class="bg-success white">
                                                    <tr>
                                                        <th>Nome</th>
                                                        <th>Nome Utilizador</th>
                                                        <th>Perfil</th>
                                                        <th>Estado</th>
                                                        <th>Op&ccedil;&otilde;es</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="container hidden" id="box-container">
                        <div class="row match-height">
                        <div class="col-xl-12 col-12">
                            <div class="card">

                                <div class="card-header">
                                    <h4 class="card-title">Caixas </h4>


                                    <a class="heading-elements-toggle"><i class="la la-ellipsis-v font-medium-3"></i></a>
                                    <div class="heading-elements" id="addBoxModal">
                                        <span class="h4" data-toggle="modal" data-target="#xlargeAddBox"><i class="ft-plus-circle info" title="Adicionar"></i> Cadastrar Caixa</span>
                                    </div>
                                </div>
                                <div class="card-content">
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered" id="box-table" width="100%">
                                            <thead class="bg-info white">
                                                <tr>
                                                    <th>Designacao</th>
                                                    <th>Tipo de Documento</th>
                                                    <th>Estado da Caixa</th>
                                                    <th>Digitalizador</th>
                                                    <th>Verificador</th>
                                                    <th>Op&ccedil;&otilde;es</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>


                     {{--  FORM MODAL USER REGISTRED --}}
                     <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="form-group">
                            <!-- Modal -->
                            <div class="modal fade text-left" id="xlarge-user" tabindex="-1" role="dialog" aria-labelledby="userForm-title" aria-hidden="true">
                                <div class="modal-dialog modal-l center-modal" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title" id="userForm-title">Cadastrar Utilizador</h4>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-12 col-xl-12">
                                                    <form class="form form-horizontal" id="user-form" data-formType="create">
                                                        <div id='doc-infoContent'><div class='form-group row'>
                                                                <label class='col-md-12' for='nome'>Nome</label><br>
                                                                <div class='col-md-12 mx-auto'>
                                                                    <input type="text" id="nome" class="form-control mb-1" name="nome" required>
                                                                    <span></span>
                                                                </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-md-12" for="sigla">Nome Utilizador</label><br>
                                                                    <div class="col-md-12 mx-auto">
                                                                        <input type="text" id="nomeUtilizador" class="form-control mb-1"  name="nomeUtilizador" required>
                                                                        <span></span>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <div class="col-md-12 mx-auto">
                                                                        <select class="form-control mb-1" aria-label="Default select example" name="perfil" id="perfil" required>
                                                                            <option selected disabled>Escolha o Perfil</option>
                                                                        </select>
                                                                        <span></span>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <div class="col-md-12 mx-auto">
                                                                        <select class="form-control mb-1" aria-label="Default select example" name="estado" id="estado" required>
                                                                            <option selected disabled>Escolha o Estado</option>
                                                                            <option value="Activo">Activo</option>
                                                                            <option value="Inactivo">Inactivo</option>
                                                                        </select>
                                                                        <span></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        <div class="form-actions">
                                                            <button type="submit" class="btn btn-info" id="save-user">
                                                                <i class="la la-check-square-o"></i> Salvar
                                                            </button>
                                                            <button type="button" class="btn btn-danger mr-1 btn_no" data-dismiss="modal" id="userModal-cancel">
                                                                <i class="ft-x"></i> Cancelar
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {{--  table Area REGISTRED --}}
                    <div class="container hidden" id="area-container">
                        <div class="row match-height">
                            <div class="col-xl-12 col-12" >
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title">Áreas de Conservação</h4>
                                        <a class="heading-elements-toggle"><i class="la la-ellipsis-v font-medium-3"></i></a>
                                        <div class="heading-elements" id="addArea-modal">
                                            <span id="add-area" class="h4" data-toggle="modal" data-target="#xlarge-area"><i class="ft-plus-circle info" title="Adicionar"></i> Adicionar</span>
                                        </div>
                                    </div>
                                    <div class="card-content">
                                        <div class="table-responsive">
                                            <table class="table table-striped table-bordered" id="area-table" width="100%">
                                                <thead class="bg-success white">
                                                    <tr>
                                                        <th>NomeArea de Conservação</th>
                                                        <th>Provincia</th>
                                                        <th>Municipio</th>
                                                        <th>Estado</th>
                                                        <th>Op&ccedil;&otilde;es</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {{-- <div id="DepDocType" class="col-xl-6 col-12">
                                <div id="DepDocTypeContent">

                                </div>
                            </div> --}}
                        </div>
                    </div>

                    {{--  FORM Area REGISTRED --}}
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="form-group">
                            <!-- Modal -->
                            <div class="modal fade text-left" id="xlarge-area" tabindex="-1" role="dialog" aria-labelledby="areaForm-title" aria-hidden="true">
                                <div class="modal-dialog modal-l center-modal" >
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title" id="areaForm-title">Cadastro da Área de Conservação</h4>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-12 col-xl-12">
                                                    <form id="area-form" class="form form-horizontal" method="POST" data-formType="create">
                                                        @csrf
                                                        <div id='doc-infoContent'>
                                                            <div class='form-group row'>
                                                                <label class='col-md-12' for='nome'>Nome da Área de Conservação</label><br>
                                                                <div class='col-md-12 mx-auto'>
                                                                    <input type="text" id="nome_area" class="form-control mb-1" name ="nome_area" required>
                                                                    <span></span>
                                                                </div>
                                                            </div>

                                                            <div class="form-group row">
                                                                <div class="col-md-12 mx-auto">
                                                                    <label for="exampleSelectGender">Provincia</label>
                                                                    <select class="form-control"  aria-label="Default select example" id="id_provincias" name="id_provincias" required>
                                                                        <option id="provincias" selected disabled>Selecione a Provincia</option>
                                                                    </select>
                                                                    <span></span>
                                                                </div>
                                                                <div class="col-md-12 mx-auto">
                                                                    <label for="exampleSelectGender">Municipio</label>
                                                                    <select class="form-control"  aria-label="Default select example" id="id_municipio" name="id_municipio" required>
                                                                        <option id="municipios" selected disabled>Selecione o Municipio</option>
                                                                    </select>
                                                                    <span></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-actions">
                                                            <button id="save-area" type="submit" class="btn btn-info" >
                                                                <i class="la la-check-square-o"></i> Salvar
                                                            </button>
                                                            <button type="button" class="btn btn-danger mr-1 btn_no pwd-close-modal" data-dismiss="modal" id="userModal-cancel">
                                                                <i class="ft-x"></i> Cancelar
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {{--  Confirm box--}}
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="form-group">
                            <!-- Modal -->
                            <div class="modal fade text-left" id="confirm" tabindex="-1" role="dialog" aria-labelledby="confirmTitle" aria-hidden="true">
                                <div class="modal-dialog modal-l center-modal" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <i class="la la-warning warning" style='font-size: 25px; margin-right: 5px;'></i><h4 class="modal-title" id="confirmTitle" style='font-weight: bold;'>Eliminando documento</h4>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-12 col-xl-12">
                                                    <p>Deseja continuar?</p>
                                                </div>
                                                <div class="col-12 col-xl-12">
                                                    <button type="button" class="btn btn-info w-25" id="btn_yes">SIM</button>
                                                    <button type="button" class="btn btn-danger w-25 btn_no" data-dismiss="modal">NÃO</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{--  EDIT PWD --}}
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="form-group">
                            <!-- Modal -->
                            <div class="modal fade text-left" id="edit-pwd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel16" aria-hidden="true">
                                <div class="modal-dialog modal-l center-modal" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title" id="myModalLabel16">Editar Senha</h4>
                                            <button type="button" class="close pwd-close-modal" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-12 col-xl-12">
                                                    <form class="form form-horizontal" id="pwd-form">
                                                        <div id='pwd-content'><div class='form-group row'>
                                                                <label class='col-md-12' for='password'>Senha</label><br>
                                                                <div class='col-md-12 mx-auto'>
                                                                    <input type="password" id="password" class="form-control mb-1" name="password" required>
                                                                    <span></span>
                                                                </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-md-12" for="sigla">Confirmar Senha</label><br>
                                                                    <div class="col-md-12 mx-auto">
                                                                        <input type="password" id="confirm-pwd" class="form-control mb-1"  name="confirm-pwd" required>
                                                                        <span></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        <div class="form-actions">
                                                            <button type="submit" class="btn btn-info" id="change-pwd">
                                                                <i class="la la-check-square-o"></i> Salvar
                                                            </button>
                                                            <button type="button" class="btn btn-danger mr-1 closeModal pwd-close-modal" data-dismiss="modal">
                                                                <i class="ft-x"></i> Cancelar
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{--  CRIAR CAIXA - MODAL BOX  --}}
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="form-group">
                            <!-- Modal -->
                            <div class="modal fade text-left" id="xlargeAddBox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel16" aria-hidden="true">
                                <div class="modal-dialog modal-l center-modal" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title" id="boxModalTitle">Cadastrar Caixas</h4>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-12 col-xl-12">
                                                    <form class="form form-horizontal" id="add-box-form">
                                                        <div id='doc-infoContent'>
                                                            <div class="row">
                                                                <div class="form-group col-md-6">
                                                                    <label class='col-md-12 p-0' for='NomeProvincia'>Tipo de Documento</label><br>
                                                                    <div class="col-md-12 p-0">
                                                                        <select class="form-control" aria-label="Default select example" name="NomeProvincia" id="NomeProvincia" required>
                                                                            <option value="0" selected disabled >Selecione o Documento</option>
                                                                        </select>

                                                                    </div>
                                                                </div>


                                                                <div class='form-group col-md-6'>
                                                                    <label class='col-md-12 p-0' for='nome'>Letra</label><br>
                                                                    <div class='col-md-12 p-0'>
                                                                        <select class="form-control" aria-label="Default select example" name="letraCaixa" id="letraCaixa">
                                                                            <option value="0" selected disabled>Selecione a letra da Caixa</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class='form-group row'>
                                                                <label class='col-md-12' for='numeroCaixa'>Número</label><br>
                                                                <div class='col-md-12 mx-auto'>
                                                                    <input type="text" id="numeroCaixa" class="form-control" name="numeroCaixa" readonly>
                                                                </div>
                                                            </div>

                                                            <div class='form-group row'>
                                                                <label class='col-md-12' for='designacaoCaixa'>Designação Caixa</label><br>
                                                                <div class='col-md-12 mx-auto'>
                                                                    <input type="text" id="designacaoCaixa" class="form-control" name="designacaoCaixa" readonly>
                                                                </div>
                                                            </div>
                                                            <div class='form-group row hidden' id="boxFolders">
                                                                <label class='col-md-12' for='boxFolders'>Pastas da Caixa</label><br>
                                                                <div class='col-md-12 mx-auto'>
                                                                    <ul class="list-group list" id="boxFoldersList">

                                                                    </ul>
                                                                </div>
                                                            </div>

                                                            <div class="form-group row">
                                                                <label class='col-md-12' for='perfilDigitalizador'>Digitalizador</label><br>
                                                                <div class="col-md-12 mx-auto">
                                                                    <select class="form-control" aria-label="Default select example" name="perfilDigitalizador" id="perfilDigitalizador">
                                                                        <option selected value="" disabled>Selecione o Digitalizador</option>
                                                                    </select>

                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <label class='col-md-12' for='perfilVerificador'>Verificador</label><br>
                                                                <div class="col-md-12 mx-auto">
                                                                    <select class="form-control" aria-label="Default select example" name="perfilVerificador" id="perfilVerificador">
                                                                        <option selected value="" disabled>Selecione o Verificador</option>
                                                                    </select>

                                                                </div>
                                                            </div>

                                                            <div class="dropdown show form-group row col-md-2" id="box-verifiedOpt">
                                                                <div class="dropdown-menu show dropdown-demo" style="height: 55px !important;">
                                                                    <div class="dropdown-item">
                                                                        <span class="float-right">
                                                                            <input type="checkbox" name="switchery" id="box-verified" class="switchery-xs"/>
                                                                            <span class="danger mb-1">*</span>
                                                                        </span>
                                                                        <label for="box-verified" class="card-title">Verificada</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-actions pb-0">
                                                            <button type="submit" class="btn btn-info" id="save">
                                                                <i class="la la-check-square-o"></i> Salvar
                                                            </button>
                                                            <button type="button" class="btn btn-danger mr-1 btn_no" data-dismiss="modal">
                                                                <i class="ft-x"></i> Cancelar
                                                            </button>

                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{--  CHARTS  --}}
                    <!-- Pie charts section start -->
                    <div class="row hidden" id="provinceStatsContainer">
                        <!-- Simple Pie Chart -->
                        <div class="col-md-12 col-sm-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title" id="province-stats-title">Estatísticas - Documentos Verificados Por Provincia</h4>
                                    <a class="heading-elements-toggle"><i class="la la-ellipsis-v font-medium-3"></i></a>
                                </div>
                                <div class="card-content show">
                                    <div class="card-body" id="province-stats-card">
                                        {{--  <canvas id="simple-pie-chart" height="600"></canvas>  --}}
                                        <div id="pie-simple-chart"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- // Pie charts section end -->

                    <div class="row hidden" id="userStatsContainer">
                        <!-- Simple Pie Chart -->
                        <div class="col-12">
                            <!-- Pie Simple Chart Start -->
                            <div class="card">
                                <div class="card-body" id="user-stats-card">
                                    <div class="card-title" id="user-stats-title">Estatísticas - Documentos Verificados Por Utilizadores Por Dia</div>
                                    <div class="d-flex ml-0">
                                        <label class="mr-1" style="font-size: 1.5rem; margin-top: auto;">  Selecione uma data </label>
                                        <input type="date" name="date_verified" id="date_verified" class="form-control col-md-2"/>
                                    </div>


                                    <div id="user-stats-chart"></div>
                                </div>
                            </div>
                            <!-- Pie Simple Chart end -->
                        </div>
                    </div>

                    <div class="row hidden" id="monthlyStatsContainer">
                        <!-- Simple Pie Chart -->
                        <div class="col-12">
                            <!-- Pie Simple Chart Start -->
                            <div class="card">
                                <div class="card-body" id="monthly-stats-card">
                                    <div class="card-title" id="monthly-stats-title">Estatísticas - Verificados Por Mês</div>
                                    <div class="d-flex ml-0">
                                        <label class="mr-1 ml-1" style="font-size: 1.5rem; margin-top: auto;"> Selecione um ano </label>

                                        <input type="text" name="year_verified" id="year_verified" class="yearpicker form-control col-md-2" value=""/>
                                    </div>


                                    <div id="monthly-stats-chart"></div>
                                </div>
                            </div>
                            <!-- Pie Simple Chart end -->
                        </div>
                    </div>

                    <div class="row hidden" id="monthlyUserStatsContainer">
                        <!-- Simple Pie Chart -->
                        <div class="col-12">
                            <!-- Pie Simple Chart Start -->
                            <div class="card">
                                <div class="card-body" id="monthly-userStats-card">
                                    <div class="card-title" id="monthly-userStats-title">Estatísticas - Documentos Verificados Por Utilizador Por Mês</div>
                                    <div class="d-flex ml-0">
                                        <input type="text" name="user_year_verified" id="user_year_verified" class="yearpicker form-control col-md-2" value="" placeholder="Selecione um ano"/>

                                        <div class="col-md-2">
                                            <select class="form-control mb-1" aria-label="Default select example" name="user" id="user" required>
                                                <option selected disabled>Selecione o Utilizador</option>
                                            </select>
                                            <span></span>
                                        </div>
                                    </div>


                                    <div id="monthly-userStats-chart"></div>
                                </div>
                            </div>
                            <!-- Pie Simple Chart end -->
                        </div>
                    </div>

                    <div class="row hidden" id="provinceUserStatsContainer">
                        <!-- Simple Pie Chart -->
                        <div class="col-12">
                            <!-- Pie Simple Chart Start -->
                            <div class="card">
                                <div class="card-body" id="province-userStats-card">
                                    <div class="card-title" id="province-userStats-title">Estatísticas - Documentos Verificados Por Utilizador e Provincia</div>
                                    <div class="d-flex ml-0">
                                        <input type="text" name="province_year_verified" id="province_year_verified" class="yearpicker form-control col-md-2" value="" placeholder="Selecione um ano"/>

                                        <div class="col-md-2">
                                            <select class="form-control mb-1" aria-label="Default select example" name="user-province" id="user-province" required>
                                                <option selected disabled>Selecione o Utilizador</option>
                                            </select>
                                            <span></span>
                                        </div>
                                    </div>


                                    <div id="province-userStats-chart"></div>
                                </div>
                            </div>
                            <!-- Pie Simple Chart end -->
                        </div>
                    </div>

                    <div class="row hidden" id="globalGraphContainer">
                        <!-- Simple Pie Chart -->
                        <div class="col-12">
                            <!-- Pie Simple Chart Start -->
                            <div class="card">
                                <div class="card-body" id="global-stats-card">
                                    <div class="card-title" id="global-stats-title">Estatísticas - Documentos Digitalizados e Verificados</div>

                                    <div id="global-stats-chart"></div>
                                </div>
                            </div>
                            <!-- Pie Simple Chart end -->
                        </div>
                    </div>
                </section>
                <!-- // Pie charts section end -->
                </div>
            </div>
        </div>

@endsection
