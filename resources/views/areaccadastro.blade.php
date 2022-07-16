@extends ('layouts/principal')

@section ('conteudo')

<div class="container " id="areaccadastro">
    <div class="row match-height">
        <div class="col-xl-12 col-12">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">Formulário da Área de Conservação</h3>

                        <form  class="forms-sample" action="/areaccadastro" method="POST">
                            @csrf
                            <div class="form-group">
                                <label for="exampleInputUsername1">Nome da Área de Conservação</label>
                                <input type="text" class="form-control" name ="areaconservacao" id="" placeholder="Digite o Nome da Área de Conservação">
                            </div>

                            <div class="form-group col-md-12 grid-margin stretch-card">
                                <label for="exampleSelectGender">Localização</label>
                                <select class="form-control"  id="val_municipio" name="val_municipio">
                                    <option id="">Selecione a Localização</option>
                                        @foreach($moradas as $morada)
                                            <option value="{{$morada->id}}">{{$morada->nome_municipio}}</option>
                                        @endforeach
                                </select>
                            </div>
                            <button type="submit" class="btn btn-info mr-2">Criar</button>
                            <button class="btn btn-danger">Cancelar</button>
                        </form>
                    </div>
                </div>
        </div>
    </div>

@endsection
