
$("document").ready(() => {

    $('input[name="teacher_button"]').click((e) => {
        e.preventDefault();
        window.location.replace(`login_teacher.html`);
    })

    $('input[name="submit"]').click((e) => {
        e.preventDefault();
        let json= {};
         json.password= $('input[name="password"]').val();
         json.userName= $('input[name="user_name"]').val();
        $.post('http://localhost:3000/user_check', json)
            .done((msg) =>
            {
                console.log(msg);
            })
            .fail((xhr, status, error) => {
                console.error("failed send to server" + error);
           });
        });

});
