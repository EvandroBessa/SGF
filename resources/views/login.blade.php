<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
        <meta name="description" content="Modern admin is super flexible, powerful, clean &amp; modern responsive bootstrap 4 admin template with unlimited possibilities with bitcoin dashboard.">
        <meta name="keywords" content="admin template, modern admin template, dashboard template, flat admin template, responsive admin template, web app, crypto dashboard, bitcoin dashboard">
        <meta name="author" content="PIXINVENT">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>SIG-FAUNA</title>
        <link rel="apple-touch-icon" href="{{asset("assets/img/SigarQ_Square.svg")}}">
        <link rel="shortcut icon" type="image/x-icon" href="{{asset("assets/img/SigarQ_Square.svg")}}">

        <!-- BEGIN: Vendor CSS-->
        <link rel="stylesheet" type="text/css" href="{{asset("vendors/css/vendors.min.css")}}">
        <link rel="stylesheet" type="text/css" href="{{asset("vendors/css/forms/icheck/icheck.css")}}">
        <link rel="stylesheet" type="text/css" href="{{asset("vendors/css/forms/icheck/custom.css")}}">

        <!-- END: Vendor CSS-->

        <!-- BEGIN: Theme CSS-->
        <link rel="stylesheet" type="text/css" href="{{asset("css/bootstrap.css")}}">
        <link rel="stylesheet" type="text/css" href="{{asset("css/bootstrap-extended.css")}}">
        <link rel="stylesheet" type="text/css" href="{{asset("css/colors.css")}}">
        <link rel="stylesheet" type="text/css" href="{{asset("css/components.css")}}">
        <!-- END: Theme CSS-->

        <!-- Plugins Theme CSS-->
        <link rel="stylesheet" type="text/css" href="{{asset("css/plugins/animate/animate.css")}}">
        <!-- END: Plugins Theme CSS-->

        <!-- BEGIN: Page CSS-->
        <link rel="stylesheet" type="text/css" href="{{asset("css/core/menu/menu-types/vertical-menu-modern.css")}}">
        <link rel="stylesheet" type="text/css" href="{{asset("css/core/colors/palette-gradient.css")}}">
        <link rel="stylesheet" type="text/css" href="{{asset("css/pages/login-register.css")}}">
        <!-- END: Page CSS-->

        <link rel="stylesheet" type="text/css" href="{{asset("css-rtl/plugins/extensions/toastr.css")}}">
        <link rel="stylesheet" type="text/css" href="{{asset("vendors/css/extensions/toastr.css")}}">

        <!-- BEGIN: Custom CSS-->
        <link rel="stylesheet" type="text/css" href="{{asset("assets/css/main.css")}}">
        <link rel="stylesheet" type="text/css" href="{{asset("assets/css/style.css")}}">
        <link rel="stylesheet" href="{{asset("assets/css/user.login.css")}}">
        <!-- END: Custom CSS-->
    </head>
    <!-- END: Head-->

    <!-- BEGIN: Body-->

    <body class="vertical-layout vertical-menu-modern 1-column  bg-full-screen-image blank-page" data-open="click" data-menu="vertical-menu-modern" data-col="1-column">
        <!-- BEGIN: Content-->
        <div class="app-content content">
            <div class="content-overlay"></div>
            <div class="content-wrapper">
                <div class="content-header row">
                </div>
                <div class="content-body d-flex align-items-center justify-content-center" style="height: 96vh">
                    <section class="row d-flex align-items-center justify-content-center">
                        <!-- Login Form-->
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <div class="sgq-login-box shadow-lg p-0 animated zoomIn">
                                <div class="card border-grey border-lighten-3 px-1 py-1 m-0">
                                    <div class="card-header border-0 pb-0">
                                        <div class="card-title text-center">
                                            <img class="brand-logo" src="{{asset("assets/img/logo7.png")}}" alt="branding logo">
                                        </div>
                                    </div>
                                    <div class="card-content">
                                        <div class="card-body">
                                            <div class="bg-danger text-white text-center h-50" id="messages"></div><br>
                                            {{-- <form action="#" class="form-horizontal" id="login-form" method="POST"> --}}
                                                @if(session('x'))

                                                <div class="alert alert-danger alert-dismissable">
                                                    <button type="button"class="close" data-dmiss="alert" aria-hiden="true">&times;</button>
                                                    <h6><i class="fa fa-times-circle"></i>{{session('x')}}</h6>
                                                </div>
                                                @endif

                                            <form class="form-horizontal" action="{{route('entrar')}}" id="login-form" method="POST">
                                                @csrf
                                                <fieldset class="form-group position-relative has-icon-left">
                                                    <input type="text"name="email" class="form-control" id="user-name"  placeholder="Digite o Nome do Utilizador" required>
                                                    <div class="form-control-position">
                                                        <i class="la la-user"></i>
                                                    </div>
                                                </fieldset>

                                                <fieldset class="form-group position-relative has-icon-left">
                                                    <input type="password" name="password" class="form-control" id="user-password" placeholder="Digite a sua Palavra-Chave" required>
                                                    <div class="form-control-position">
                                                        <i class="la la-key"></i>
                                                    </div>
                                                </fieldset>

                                                <div class="form-group mb-0">
                                                    <button type="submit" class="sgq-login-button btn btn-primary btn-block"><i class="ft-unlock"></i> Autenticar </button>
                                                    <span class="sgq-loading-status d-none align-items-center justify-content-center flex-column mt-2 w-100">
                                                        <p class="sgq-ls-text w-100 text-center">Autenticando...</p>
                                                        <i class="sgq-ls-spinner spinner-border text-primary"></i>
                                                    </span>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- CopyRight Box -->
                        <div class="col-12 pt-2 d-flex align-items-center justify-content-center">
                            <div class="sgq-copyright-box card animated slideInUp">
                                <div class="card-header pb-0">
                                    <h4 class="card-title text-center">Desenvolvido Por:</h4>
                                </div>

                                <div class="card-body text-center m-0">
                                    {{--  <img src="../../../assets/img/Logo_Interdigitos_2020_Horizontal_Colorido.png" style="max-height: 68px"/>  --}}
                                    <p class="m-0 d-block">Copyright &copy;2022 UAN. <br>Equipa de Dev <i class="la la-code text-primary" style="font-size: 1.4em;position: relative;top: 3px;font-weight: 600;"></i></code></p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <script src="{{asset("vendors/js/vendors.min.js")}}"></script>
        <script src="{{asset("vendors/js/forms/icheck/icheck.min.js")}}"></script>
        <script src="{{asset("js/core/app-menu.js")}}"></script>
        <script src="{{asset("js/core/app.js")}}"></script>
        <script src="{{asset("vendors/js/extensions/toastr.min.js")}}"></script>
        <script src="{{asset("js/scripts/extensions/toastr.js")}}"></script>
        {{-- <script src="{{asset("js/core/libraries/jquery.min.js")}}"></script> --}}
       
        {{--  <script src="../../../app-assets/js/core/libraries/jquery.min.js"></script>  --}}
        {{-- <script src="{{asset("js/core/libraries/jquery.slim.js")}}"></script> --}}
         {{-- <script src="{{asset("js/core/libraries/jquery.min.js")}}"></script> --}}

        <script src="{{asset("vendors/js/animation/jquery.appear.js")}}"></script>
        <script src="{{asset("js/scripts/animation/animation.js")}}"></script>

        {{--  App JS Files  --}}
        <script src="{{asset("assets/js/user.login.js")}}"></script>
        <script>
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        </script>
    </body>
</html>

