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
    <title>SIG-FAUNA</title>
    <link rel="apple-touch-icon" href="{{asset("images/ico/apple-icon-120.png")}}">
    <link rel="shortcut icon" type="image/x-icon" href="{{asset("images/ico/favicon.ico")}}">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i%7CQuicksand:300,400,500,700" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{asset("fonts/material-icons/material-icons.css")}}">

    <!-- BEGIN: Vendor CSS-->
    <link rel="stylesheet" type="text/css" href="{{asset("vendors/css/material-vendors.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("vendors/css/weather-icons/climacons.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("fonts/meteocons/style.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("vendors/css/charts/morris.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("vendors/css/charts/chartist.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("vendors/css/charts/chartist-plugin-tooltip.css")}}">
    <!-- END: Vendor CSS-->

    <!-- BEGIN: Theme CSS-->
    <link rel="stylesheet" type="text/css" href="{{asset("css/material.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("css/components.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("css/bootstrap-extended.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("css/material-extended.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("css/material-colors.css")}}">
    <!-- END: Theme CSS-->

    <!-- BEGIN: Page CSS-->
    <link rel="stylesheet" type="text/css" href="{{asset("css/core/menu/menu-types/material-vertical-menu-modern.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("fonts/simple-line-icons/style.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("core/colors/palette-gradient.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("css/pages/timeline.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("css/pages/dashboard-ecommerce.css")}}">
    <!-- END: Page CSS-->

    <!-- BEGIN: Custom CSS-->
    <link rel="stylesheet" type="text/css" href="{{asset("assets/css/style.css")}}">
    <!-- END: Custom CSS-->

</head>
<!-- END: Head-->

<!-- BEGIN: Body-->

<body class="vertical-layout vertical-menu-modern material-vertical-layout material-layout 2-columns   fixed-navbar" data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">

    <!-- BEGIN: Header-->
    <nav class="header-navbar navbar-expand-lg navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-dark navbar-shadow">
        <div class="navbar-wrapper">
            <div class="navbar-header">
                <ul class="nav navbar-nav flex-row">
                    <li class="nav-item mobile-menu d-lg-none mr-auto"><a class="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i class="ft-menu font-large-1"></i></a></li>
                    <li class="nav-item mr-auto"><a class="navbar-brand" href="index.html"><img class="brand-logo" alt="modern admin logo" src="{{asset("images/logo/logo.png")}}">
                            <h3 class="brand-text">SIG-FAUNA</h3>
                        </a></li>
                    <li class="nav-item d-none d-lg-block nav-toggle"><a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse"><i class="toggle-icon ft-toggle-right font-medium-3 white" data-ticon="ft-toggle-right"></i></a></li>
                    <li class="nav-item d-lg-none"><a class="nav-link open-navbar-container" data-toggle="collapse" data-target="#navbar-mobile"><i class="material-icons mt-50">more_vert</i></a></li>
                </ul>
            </div>
            <div class="navbar-container content">
                <div class="collapse navbar-collapse" id="navbar-mobile">
                    <ul class="nav navbar-nav mr-auto float-left">
                        <li class="nav-item d-none d-md-block"><a class="nav-link nav-menu-main menu-toggle" href="#"><i class="ft-menu"></i></a></li>
                        <li class="nav-item nav-search"><a class="nav-link nav-link-search" href="#"><i class="material-icons">search</i></a>
                            <div class="search-input">
                                <input class="input round form-control search-box" type="text" placeholder="Explore Modern Admin" tabindex="0" data-search="template-list">
                                <div class="search-input-close"><i class="ft-x"></i></div>
                                <ul class="search-list"></ul>
                                <div class="dropdown-menu arrow">
                                    <div class="dropdown-item">
                                        <input class="round form-control" type="text" placeholder="Search Here">
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="nav-item"><a class="nav-link nav-link-expand mx-md-1 mx-0" href="#"><i class="ficon ft-maximize"></i></a></li>

                    </ul>
                    <ul class="nav navbar-nav float-right">
                        <li class="dropdown dropdown-language nav-item"><a class="dropdown-toggle nav-link" id="dropdown-flag" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="flag-icon flag-icon-gb"></i><span class="selected-language"></span></a>
                            <div class="dropdown-menu" aria-labelledby="dropdown-flag"><a class="dropdown-item" href="#" data-language="en"><i class="flag-icon flag-icon-us"></i> English</a><a class="dropdown-item" href="#" data-language="fr"><i class="flag-icon flag-icon-fr"></i> French</a><a class="dropdown-item" href="#" data-language="pt"><i class="flag-icon flag-icon-pt"></i> Portuguese</a><a class="dropdown-item" href="#" data-language="de"><i class="flag-icon flag-icon-de"></i> German</a></div>
                        </li>
                        <li class="dropdown dropdown-notification nav-item"><a class="nav-link nav-link-label" href="#" data-toggle="dropdown"><i class="material-icons">notifications_none</i><span class="badge badge-pill badge-danger badge-up badge-glow">5</span></a>
                            <ul class="dropdown-menu dropdown-menu-media dropdown-menu-right">
                                <li class="dropdown-menu-header">
                                    <h6 class="dropdown-header m-0"><span class="grey darken-2">Notifications</span></h6><span class="notification-tag badge badge-danger float-right m-0">5 New</span>
                                </li>
                                <li class="scrollable-container media-list w-100"><a href="javascript:void(0)">
                                        <div class="media">
                                            <div class="media-left align-self-center"><i class="material-icons icon-bg-circle bg-cyan mr-0">add_box</i></div>
                                            <div class="media-body">
                                                <h6 class="media-heading">You have new order!</h6>
                                                <p class="notification-text font-small-3 text-muted">Lorem ipsum dolor sit amet, consectetuer elit.</p><small>
                                                    <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">30 minutes ago</time></small>
                                            </div>
                                        </div>
                                    </a><a href="javascript:void(0)">
                                        <div class="media">
                                            <div class="media-left align-self-center"><i class="material-icons icon-bg-circle bg-red bg-darken-1">cloud_download</i></div>
                                            <div class="media-body">
                                                <h6 class="media-heading red darken-1 mr-0">99% Server load</h6>
                                                <p class="notification-text font-small-3 text-muted">Aliquam tincidunt mauris eu risus.</p><small>
                                                    <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">Five hour ago</time></small>
                                            </div>
                                        </div>
                                    </a><a href="javascript:void(0)">
                                        <div class="media">
                                            <div class="media-left align-self-center"><i class="material-icons icon-bg-circle bg-yellow bg-darken-3">warning</i></div>
                                            <div class="media-body">
                                                <h6 class="media-heading yellow darken-3 mr-0">Warning notifixation</h6>
                                                <p class="notification-text font-small-3 text-muted">Vestibulum auctor dapibus neque.</p><small>
                                                    <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">Today</time></small>
                                            </div>
                                        </div>
                                    </a><a href="javascript:void(0)">
                                        <div class="media">
                                            <div class="media-left align-self-center"><i class="material-icons icon-bg-circle bg-cyan mr-0">check_circle</i></div>
                                            <div class="media-body">
                                                <h6 class="media-heading">Complete the task</h6><small>
                                                    <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">Last week</time></small>
                                            </div>
                                        </div>
                                    </a><a href="javascript:void(0)">
                                        <div class="media">
                                            <div class="media-left align-self-center"><i class="material-icons icon-bg-circle bg-teal mr-0">insert_drive_file</i></div>
                                            <div class="media-body">
                                                <h6 class="media-heading">Generate monthly report</h6><small>
                                                    <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">Last month</time></small>
                                            </div>
                                        </div>
                                    </a></li>
                                <li class="dropdown-menu-footer"><a class="dropdown-item text-muted text-center" href="javascript:void(0)">Read all notifications</a></li>
                            </ul>
                        </li>

                        <li class="dropdown dropdown-user nav-item"><a class="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown"><span class="mr-1 user-name text-bold-700">John Doe</span><span class="avatar avatar-online"><img src="{{asset("images/portrait/small/avatar-s-19.png")}}" alt="avatar"><i></i></span></a>
                            <div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#"><i class="material-icons">person_outline</i> Edit Profile</a>
                                <div class="dropdown-divider"></div><a class="dropdown-item" href="login-with-bg-image.html"><i class="material-icons">power_settings_new</i> Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <!-- END: Header-->


    <!-- BEGIN: Main Menu-->

    <div class="main-menu material-menu menu-fixed menu-dark menu-accordion menu-shadow" data-scroll-to-active="true">

        <div class="main-menu-content">
            <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">



                <li class=" nav-item"><a href="#"><i class="material-icons">straighten</i><span class="menu-title" data-i18n="Material Components">Áreas de Conservação</span></a>
                    <ul class="menu-content">
                        <li><a class="menu-item" href="material-component-buttons.html"><i class="material-icons"></i><span data-i18n="Buttons">Cadastrar</span></a>
                        </li>
                        <li><a class="menu-item" href="material-component-cards.html"><i class="material-icons"></i><span data-i18n="Cards">Listar</span></a>
                        </li>
                        <li><a class="menu-item" href="material-component-expansion-panels.html"><i class="material-icons"></i><span data-i18n="Expansion Panels">Expansion Panels</span></a>
                        </li>

                    </ul>
                </li>
                <li class=" nav-item"><a href="#"><i class="material-icons">view_list</i><span class="menu-title" data-i18n="Components">Animal</span></a>
                    <ul class="menu-content">
                        <li><a class="menu-item" href="component-alerts.html"><i class="material-icons"></i><span data-i18n="Alerts">Cadastrar</span></a>
                        </li>
                        <li><a class="menu-item" href="component-callout.html"><i class="material-icons"></i><span data-i18n="Callout">Listar</span></a>
                        </li>
                        </li>
                        <li><a class="menu-item" href="component-carousel.html"><i class="material-icons"></i><span data-i18n="Carousel">Actualizar</span></a>
                        </li>

                    </ul>
                </li>
                <li class=" nav-item"><a href="#"><i class="material-icons">lock_outline</i><span class="menu-title" data-i18n="Authentication">Adicionar Caracteristica</span></a>
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
                <li class=" nav-item"><a href="#"><i class="material-icons">grid_on</i><span class="menu-title" data-i18n="Form Layouts">Estatística</span></a>
                    <ul class="menu-content">
                        <li><a class="menu-item" href="form-layout-basic.html"><i class="material-icons"></i><span data-i18n="Basic Forms">Basic Forms</span></a>
                        </li>
                        <li><a class="menu-item" href="form-layout-horizontal.html"><i class="material-icons"></i><span data-i18n="Horizontal Forms">Horizontal Forms</span></a>
                        </li>
                        <li><a class="menu-item" href="form-layout-hidden-labels.html"><i class="material-icons"></i><span data-i18n="Hidden Labels">Hidden Labels</span></a>
                        </li>

                    </ul>
                </li>


                <li class=" nav-item"><a href="#"><i class="material-icons">show_chart</i><span class="menu-title" data-i18n="Chartjs">Configurações</span></a>
                    <ul class="menu-content">
                        <li><a class="menu-item" href="chartjs-line-charts.html"><i class="material-icons"></i><span data-i18n="Line charts">Line charts</span></a>
                        </li>
                        <li><a class="menu-item" href="chartjs-bar-charts.html"><i class="material-icons"></i><span data-i18n="Bar charts">Bar charts</span></a>
                        </li>
                        <li><a class="menu-item" href="chartjs-pie-doughnut-charts.html"><i class="material-icons"></i><span data-i18n="Pie &amp; Doughnut charts">Pie &amp; Doughnut charts</span></a>
                        </li>
                        <li><a class="menu-item" href="chartjs-scatter-charts.html"><i class="material-icons"></i><span data-i18n="Scatter charts">Scatter charts</span></a>
                        </li>
                        <li><a class="menu-item" href="chartjs-polar-radar-charts.html"><i class="material-icons"></i><span data-i18n="Polar &amp; Radar charts">Polar &amp; Radar charts</span></a>
                        </li>
                        <li><a class="menu-item" href="chartjs-advance-charts.html"><i class="material-icons"></i><span data-i18n="Advance charts">Advance charts</span></a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>

    <!-- END: Main Menu-->
    <!-- BEGIN: Content-->

    <!-- END: Content-->


    <main>
        @yield('conteudo')
    </main>

    <!-- BEGIN: Footer-->
    <footer class="footer fixed-bottom footer-light navbar-border navbar-shadow">
        <p class="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2"><span class="float-md-left d-block d-md-inline-block">Copyright &copy; 2022 <a class="text-bold-800 grey darken-2" href="https://1.envato.market/modern_admin" target="_blank">PIXINVENT</a></span><span class="float-md-right d-none d-lg-block">Hand-crafted & Made with<i class="ft-heart pink"></i><span id="scroll-top"></span></span></p>
    </footer>
    <!-- END: Footer-->


    <!-- BEGIN: Vendor JS-->
    <script src="{{asset("vendors/js/material-vendors.min.js")}}"></script>
    <!-- BEGIN Vendor JS-->

    <!-- BEGIN: Page Vendor JS-->
    <script src="{{asset("vendors/js/charts/chartist.min.js")}}"></script>
    <script src="{{asset("vendors/js/charts/chartist-plugin-tooltip.min.js")}}"></script>
    <script src="{{asset("vendors/js/charts/raphael-min.js")}}"></script>
    <script src="{{asset("vendors/js/charts/morris.min.js")}}"></script>
    <script src="{{asset("vendors/js/timeline/horizontal-timeline.js")}}"></script>
    <!-- END: Page Vendor JS-->

    <!-- BEGIN: Theme JS-->
    <script src="{{asset("js/core/app-menu.js")}}"></script>
    <script src="{{asset("js/core/app.js")}}"></script>
    <!-- END: Theme JS-->

    <!-- BEGIN: Page JS-->
    <script src="{{asset("js/scripts/pages/material-app.js")}}"></script>
    <script src="{{asset("js/scripts/pages/dashboard-ecommerce.js")}}"></script>
    <!-- END: Page JS-->

</body>
<!-- END: Body-->

</html>
