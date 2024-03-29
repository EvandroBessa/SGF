<!DOCTYPE html>
<html class="loading" lang="en" data-textdirection="ltr">
<!-- BEGIN: Head-->

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta name="description" content="Modern admin is super flexible, powerful, clean &amp; modern responsive bootstrap 4 admin template with unlimited possibilities with bitcoin dashboard.">
    <meta name="keywords" content="admin template, modern admin template, dashboard template, flat admin template, responsive admin template, web app, crypto dashboard, bitcoin dashboard">
    <meta name="author" content="PIXINVENT">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="Content-Security-Policy: img-src 'self' " content="default-src *; img-src * 'self' data: https: http:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src  'self' 'unsafe-inline' *">
    <title>SIG-FAUNA</title>
    <link rel="apple-touch-icon" href="{{asset("assets/img/SigarQ_Square.svg")}}">
    <link rel="shortcut icon" type="image/x-icon" href="{{asset("assets/img/SigarQ_Square.svg")}}">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i%7CQuicksand:300,400,500,700" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{asset("fonts/material-icons/material-icons.css")}}">

    <!-- BEGIN: Vendor CSS-->
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/vendors/css/material-vendors.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/vendors/css/extensions/toastr.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/vendors/css/forms/icheck/icheck.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/vendors/css/forms/toggle/switchery.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/vendors/css/ui/jquery-ui.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/vendors/css/weather-icons/climacons.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/fonts/meteocons/style.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/vendors/css/charts/morris.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/vendors/css/charts/chartist.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/vendors/css/charts/chartist-plugin-tooltip.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/vendors/css/cryptocoins/cryptocoins.css")}}">

    <!-- END: Vendor CSS-->

    <!-- BEGIN: Theme CSS-->
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/material.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/plugins/animate/animate.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/plugins/animate/4.1.1/animate.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/components.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/bootstrap-extended.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/material-extended.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/material-colors.css")}}">
    <!-- END: Theme CSS-->

    <!-- BEGIN: Page CSS-->
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/core/menu/menu-types/material-vertical-menu-modern.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/fonts/simple-line-icons/style.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/core/colors/palette-gradient.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/pages/timeline.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/pages/dashboard-ecommerce.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/bootstrap.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/bootstrap-extended.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/colors.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/components.css")}}">

    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css-rtl/plugins/extensions/toastr.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/plugins/forms/switch.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/vendors/css/tables/datatable/datatables.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/fonts/simple-line-icons/style.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/plugins/loaders/loaders.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("app-assets/css/plugins/ui/jqueryui.css")}}">


    <!-- END: Page CSS-->

    <!-- BEGIN: Custom CSS-->
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/style.css")}}">
    <!-- END: Custom CSS-->

    <!-- Page: WorkSpace-->
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/workspace.layout.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/yearpicker.css")}}">

</head>
<!-- END: Head-->

<!-- BEGIN: Body-->

<body class="vertical-layout vertical-menu-modern 2-columns   fixed-navbar" data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
<!-- BEGIN: APP Loading-->
    <div id="sgq-app-loading-page" class="d-flex align-items-center justify-content-center flex-column" style="position: fixed; width: 100%; height: 100%; left: 0; top: 0;">
        <img class="sgq-lp-app-logo animated fadeInDown" src="{{asset("assets/img/logo7.png")}}"/>
        <span class="sgq-lp-app-spinner animated zoomIn">
            <i class="sgq-lp-app-spinner-animated mt-1 spinner-border text-success"></i>
        </span>
    </div>
    <div id="sigarq-app" style="height: calc(100vh - 115px);">
        <!-- BEGIN: Header-->
        <header id="sgq-app-header" class="header-navbar navbar-expand-lg navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-dark navbar-shadow">
            <div class="navbar-wrapper">
                <div class="navbar-header">
                    <ul class="nav navbar-nav flex-row">
                        <li class="nav-item mobile-menu d-lg-none mr-auto"><a class="nav-link nav-menu-main menu-toggle hidden-xs" href="/welcome/1"><i class="ft-menu font-large-1"></i></a></li>
                        <li class="nav-item mr-auto"><a class="navbar-brand" href="/welcome/1">
                            <img class="brand-logo" alt="modern admin logo" src="{{asset("assets/img/SigarQ_White.svg")}}">
                                <h3 class="brand-text">SIG-FAUNA</h3>
                            </a></li>
                        <li class="nav-item d-none d-lg-block nav-toggle"><a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse"><i class="toggle-icon ft-toggle-right font-medium-3 white" data-ticon="ft-toggle-right"></i></a></li>
                        <li class="nav-item d-lg-none"><a class="nav-link open-navbar-container" data-toggle="collapse" data-target="#navbar-mobile"><i class="material-icons mt-50">more_vert</i></a></li>
                    </ul>
                </div>
                <div class="navbar-container content">
                    <div class="collapse navbar-collapse" id="navbar-mobile">
                        <ul class="nav navbar-nav mr-auto float-left">
                            <li class="nav-item d-none d-lg-block">
                                <a class="nav-link nav-link-expand" href="#">
                                    <i class="ficon ft-maximize"></i>
                                </a>
                            </li>

                            <!-- Header: Global SearchBar -->
                            <li class="sgq-global-searchBar-main-container nav-item d-flex justify-content-center align-items-center pl-2">
                                <div class="form-group position-relative m-0" style="height: 42px">
                                    <input id="sgq-global-searchbox" type="text" class="form-control border-0" placeholder="Pesquisar Animais...">
                                    <div class="form-control-position">
                                        <label for="boxSearch" sgq-handle-global-searchBar="close" class="h-100 m-0 d-flex justify-content-center" style="padding-top: 1px;">
                                            <i class="sgq-global-searchbox-icon icon-magnifier light font-medium-4"></i>
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ul class="nav navbar-nav float-right">
                            <li class="dropdown dropdown-user nav-item"><a class="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown"><span class="mr-1 user-name text-bold-700">Bem Vindo(a), Utilizador</span><span class="avatar avatar-online"><img src="{{asset("images/portrait/small/user_male.png")}}" alt="avatar"><i></i></span></a>
                                <div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#"><i class="material-icons">person_outline</i> Edit Profile</a>
                                    <div class="dropdown-divider"></div><a class="dropdown-item" href="{{route('logout')}}" onclick="showSwal('auto-close')"><i class="material-icons">power_settings_new</i> Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        <!-- END: Header-->


        <!-- BEGIN: Main Menu-->

        <nav id="sgq-app-navbar" class="main-menu menu-fixed menu-dark menu-accordion menu-shadow" data-scroll-to-active="true">

            <div class="main-menu-content">
                <ul  id="main-menu-navigation" class="navigation navigation-main pt-2" data-menu="menu-navigation">
                    <li class="active">
                        <a href="/welcome/1">
                            <i class="la la-desktop"></i>
                            <span class="menu-title" data-i18n="Crypto Dashboard">WorkSpace</span>
                        </a>
                    </li>
                    <li >
                        <a href="#">
                            
                        </a>
                    </li>

                    <li class=" nav-item"><a href="#"><i class="la la-globe"></i><span class="menu-title" data-i18n="Material Components">Áreas de Conservação</span></a>
                        <ul class="menu-content">
                            <li><a class="menu-item" href="#" id="register-area"><i class="material-icons"></i><span data-i18n="Buttons">Cadastrar</span></a>
                            </li>
                            <li><a class="menu-item" href="#"id="list-area"><i class="material-icons"></i><span data-i18n="Cards">Listar</span></a>
                            </li>


                        </ul>
                    </li>
                    <li class=" nav-item"><a href="dashboard-sales.html"><i class="la la-pencil-square"></i><span class="menu-title" data-i18n="Components">Animal</span></a>
                        <ul class="menu-content">
                            <li><a class="menu-item" href="#" id="register-animal"><i class="material-icons"></i><span data-i18n="Alerts">Cadastrar</span></a>
                            </li>
                            <li><a class="menu-item" href="#"><i class="material-icons"></i><span data-i18n="Callout">Listar</span></a>
                            </li>
                            </li>
                            <li><a class="menu-item" href="#"><i class="material-icons"></i><span data-i18n="Carousel">Actualizar</span></a>
                            </li>

                        </ul>
                    </li>
                    <li class=" nav-item"><a href="#"><i class="la la-dropbox"></i><span class="menu-title" data-i18n="Authentication">Caracteristicas</span></a>
                        <ul class="menu-content">
                            <li><a class="menu-item" href="/filo_listar_cadastrar"><i class="material-icons"></i><span>Filo</span></a>
                            </li>
                            <li><a class="menu-item" href="login-with-bg-image.html" target="_blank"><i class="material-icons"></i><span>Sub-Filo</span></a>
                            </li>
                            <li><a class="menu-item" href="register-with-bg-image.html" target="_blank"><i class="material-icons"></i><span>Super-Classe</span></a>
                            </li>
                            <li><a class="menu-item" href="recover-password.html" target="_blank"><i class="material-icons"></i><span>Classe</span></a>
                            </li>
                            <li><a class="menu-item" href="login-with-bg-image.html" target="_blank"><i class="material-icons"></i><span>Ordem</span></a>
                            </li>
                            <li><a class="menu-item" href="login-with-bg-image.html" target="_blank"><i class="material-icons"></i><span>Familia</span></a>
                            </li>
                            <li><a class="menu-item" href="login-with-bg-image.html" target="_blank"><i class="material-icons"></i><span>Genero</span></a>
                            </li>
                            <li><a class="menu-item" href="login-with-bg-image.html" target="_blank"><i class="material-icons"></i><span>Especie</span></a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item" id="stats_menu" sgq-data-navbar-section="Estatisticas">
                        <a href="#">
                            <i class="la la-pie-chart"></i>
                            <span class="menu-title" data-i18n="Components">Estatísticas</span>
                        </a>
                        <ul class="menu-content">
                            <li><a class="menu-item" href="#" id="geral-stats"><i class="material-icons"></i><span data-i18n="Basic Forms">Cadastrados Geral</span></a>
                            </li>
                            <li><a class="menu-item" href="#" id="animal-province-stats"><i class="material-icons"></i><span data-i18n="Horizontal Forms">Cadastrados - Provincia</span></a>
                            </li>
                            <li><a class="menu-item" href="form-layout-horizontal.html"><i class="material-icons"></i><span data-i18n="Horizontal Forms">Cadastrados - Mensal</span></a>
                            </li>
                            <li><a class="menu-item" href="form-layout-hidden-labels.html"><i class="material-icons"></i><span data-i18n="Hidden Labels">Cadastrados - dia</span></a>
                            </li>

                        </ul>

                    </li>


                    <li class="nav-item" id="gestao_menu">
                        <a href="#">
                            <i class="la la-gear"></i>
                            <span class="menu-title" data-i18n="Components">Configurações</span>
                        </a>
                        <ul class="menu-content">
                            <li><a class="menu-item" href="#" id="register-user"><i class="la la-users"></i><span data-i18n="Line charts">Gerir Utilizador</span></a>
                            </li>

                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        <!-- END: Main Menu-->


        <!-- BEGIN: Content-->
        {{-- <div class="app-content content h-100">
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


        </div> --}}
        <!-- END: Content-->

        <main>
            @yield('conteudo')
        </main>

        <div class="sidenav-overlay"></div>

        <!-- MODAL DA PESQUISA GLOBAL-->


        <!-- END: MODAL DA PESQUISA GLOBAL-->

        <div class="drag-target"></div>
        <!-- BEGIN: Footer-->
        <footer class="footer fixed-bottom footer-light navbar-border navbar-shadow">
            <p class="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2"><span class="float-md-left d-block d-md-inline-block">Copyright &copy; 2022 <a class="text-bold-800 grey darken-2" href="https://1.envato.market/modern_admin" target="_blank">PIXINVENT</a></span><span class="float-md-right d-none d-lg-block">Hand-crafted & Made with<i class="ft-heart pink"></i><span id="scroll-top"></span></span></p>
        </footer>
        <!-- END: Footer-->
    </div>
    <div id="sigarq-print" style="height: 500px; width: 400px;"></div>

    <!-- BEGIN: Vendor JS-->
    <script src="{{asset("app-assets/vendors/js/vendors.min.js")}}"></script>
    <!-- BEGIN Vendor JS-->

    <!-- BEGIN: Page Vendor JS-->
    <script src="{{asset("app-assets/vendors/js/charts/chartist.min.js")}}"></script>
    <script src="{{asset("app-assets/vendors/js/charts/chart.min.js")}}"></script>
    <script src="{{asset("app-assets/vendors/js/charts/apexcharts/apexcharts.min.js")}}"></script>
    <script src="{{asset("vendors/js/extensions/toastr.min.js")}}"></script>

    <script src="{{asset("app-assets/vendors/js/charts/chartist-plugin-tooltip.min.js")}}"></script>
    <script src="{{asset("app-assets/vendors/js/charts/raphael-min.js")}}"></script>
    <script src="{{asset("app-assets/vendors/js/charts/morris.min.js")}}"></script>
    <script src="{{asset("vendors/js/timeline/horizontal-timeline.js")}}"></script>
    <script src="{{asset("vendors/js/forms/icheck/icheck.min.js")}}"></script>
    <script src="{{asset("vendors/js/forms/toggle/switchery.min.js")}}"></script>
    <script src="{{asset("vendors/js/forms/toggle/switchery.min.js")}}"></script>
    <script src="{{asset("vendors/js/forms/select/select2.full.min.js")}}"></script>
    <script src="{{asset("vendors/js/forms/tags/form-field.js")}}"></script>
    <!-- END: Page Vendor JS-->

    <!-- BEGIN: Theme JS-->
    <script src="{{asset("app-assets/js/core/app-menu.js")}}"></script>
    <script src="{{asset("app-assets/js/core/app.js")}}"></script>
    <script src="{{asset("app-assets/js/core/libraries/jquery.min.js")}}"></script>
    <script src="{{asset("app-assets/js/core/libraries/jquery_ui/jquery-ui.min.js")}}"></script>
    <script src="{{asset("app-assets/js/scripts/extensions/toastr.js")}}"></script>
    {{-- <script src="{{asset("js/scripts/dropdowns/dropdowns.js")}}"></script> --}}
    <script src="{{asset("vendors/js/tables/datatable/datatables.min.js")}}"></script>
    <script src="{{asset("app-assets/js/scripts/tables/datatables/datatable-basic.js")}}"></script>
    {{-- <script src="{{asset("js/scripts/forms/select/form-select2.js")}}"></script> --}}
    <script src="{{asset("app-assets/js/scripts/forms/custom-file-input.js")}}"></script>
    <script src="{{asset("app-assets/js/scripts/modal/components-modal.js")}}"></script>
    {{-- <script src="{{asset("js/scripts/ui/jquery-ui/date-pickers.js")}}"></script> --}}
    {{-- <script src="{{asset("app-assets/js/scripts/ui/scrollable.js")}}"></script> --}}
    {{-- <script src="{{asset("app-assets/js/scripts/animation/animation.js")}}"></script> --}}
    <!-- END: Theme JS-->

    {{--  jQuery Plugins --}}
    <script src="{{asset("assets/plugins/jquery-cookie/src/jquery.cookie.js")}}"></script>

    {{--  Charts  --}}
    <script src="{{asset("assets/js/charts/sigarq-apexcharts.js")}}"></script>

    {{--  Moment.JS  --}}
    <script src="{{asset("assets/plugins/moment/moment.js")}}"></script>

    <script src="{{asset("assets/js/app.layout.js")}}"></script>
    <script src="{{asset("assets/js/home.script.js")}}"></script>
    <script src="{{asset("assets/js/user.script.js")}}"></script>
    <script src="{{asset("assets/js/area_conservacao.script.js")}}"></script>
    <script src="{{asset("assets/js/animal.script.js")}}"></script>
    {{-- <script src="{{asset("assets/js/documents.script.js")}}"></script> --}}
    <script src="{{asset("assets/js/folder.script.js")}}"></script>
    {{-- <script src="{{asset("assets/js/box.script.js")}}"></script> --}}

    {{-- <script src="{{asset("assets/js/departments.script.js")}}"></script> --}}
    <script src="{{asset("assets/js/yearpicker.js")}}"></script>

    {{-- Módulo APP Inicializa todos os módulos à cima --}}
    <script src="{{asset("assets/js/scripts/modules/module.app.js")}}"></script>
    <script src="{{asset("assets/js/scripts/modules/module.routes.js")}}"></script>
    {{-- <script src="{{asset("assets/js/scripts/modules/module.header.js")}}"></script> --}}

    {{-- OBS: Arquivo na qual os módulos são inicializados --}}
    {{-- <script src="{{asset("assets/js/scripts/modules/module.run_modules.js")}}"></script> --}}

    <!-- END:MODULES JS -->
    <script src="{{asset("assets/js/documents.script.js")}}"></script>

    <!-- BEGIN: Page JS-->
    <script src="{{asset("app-assets/js/scripts/pages/material-app.js")}}"></script>
    {{-- <script src="{{asset("js/scripts/pages/dashboard-ecommerce.js")}}"></script> --}}
    {{-- <script src="{{asset("js/scripts/pages/dashboard-crypto.js")}}"></script> --}}

    <script type="text/javascript">
        var URL_SITE = '" . URL::to('/') . "';
    </script>
    <!-- END: Page JS-->

</body>
<!-- END: Body-->

</html>
