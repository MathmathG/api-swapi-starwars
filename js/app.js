var app = {
    init: function(){
        console.log('App : init');
$('#people-btn').on('click', app.getPeople);
    },

    getPeople: function(){
        $.ajax('https://swapi.co/api/people/?format=json',{
            dataType: 'json'
        })
        .done(function(data){
            console.log(data.results);
            app.displayPeople(data.results);
        })
        .fail(function(){
            alert('Erreurd\'accès au serveur swapi.co');
        })
    },

    displayPeople: function(peopleData){
        $('#people-list').empty();
        $.each(peopleData, function(index, character){
            var $li = $('<li>').text(character.name);

            $li.data('url', character.url);
            $li.on('click', app.displayCharacter);
            $('#people-list').append($li);
        });
    },

    displayCharacter: function(){
        var url = $(this).data('url');
        console.log(url);

        // On charge la template
        $.ajax('views/character.html', {
            dataType: 'html'
        })
        .done(function(response){
            $.ajax(url + '?format=json')
            .done(function(character){
                console.log(character);

                var $tpl = $(response);
                $('.name', $tpl).text(character.name);
                $tpl.find('.gender').text(character.gender);
                $tpl.find('.height').text(character.height);
                $tpl.find('.mass').text(character.mass);
                $tpl.find('.hair_color').text(character.hair_color);
                $tpl.find('.eye_color').text(character.eye_color);
                $tpl.find('.birth_year').text(character.birth_year);
               
                $('#people-details').html($tpl.html());
            })
        });
    }
};
$(app.init);