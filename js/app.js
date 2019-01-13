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

            $('#people-list').append($li);
        })
    }
};
$(app.init);