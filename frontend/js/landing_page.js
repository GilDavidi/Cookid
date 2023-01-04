const URL = window.location.origin;

$("document").ready(() => {

    $('input[name="teacher_button"]').click((e) => {
        e.preventDefault();
        window.location.replace(`login/loginTeacher.html`);
    })

    $('input[name="pupil_button"]').click((e) => {
        e.preventDefault();
        window.location.replace(`login/loginPupil.html`);
    })

    $('input[name="submitTeacherDetails"]').click((e) => {
        e.preventDefault();
        let jsonTeacher= {};
         jsonTeacher.password= $('input[name="password"]').val();
         jsonTeacher.userName= $('input[name="user_name"]').val();
        $.post('http://localhost:3001/login/checkUserTeacher', jsonTeacher)
            .done((userCheckServer) =>
            {
                if (userCheckServer == "The user exist")
                {
                    $.get('http://localhost:3001/groups/createGroups')
                        .done((createGroupsMsg) =>
                            {
                                if(createGroupsMsg=="Create Groups was succeed")
                                {
                                    window.location.replace(`../groups/dividingGroupsTeacher.html`);
                                }
                            })
                        .fail(
                            (error) => {
                                console.error("failed send to server" + error);
                            });

                }
            })
            .fail((xhr, status, error) => {
                console.error("failed send to server" + error);
           });
        });
    $('input[name="submitPupilDetails"]').click((e) => {
        e.preventDefault();
        let jsonPupil= {};
        jsonPupil.userName= $('input[name="user_name"]').val();
        $.post('http://localhost:3001/login/checkUserPupil', jsonPupil)
            .done((msg) =>
            {
                if (msg != "The user does not exist, try again")
                {
                    window.location.replace(`../groups/waitingPagePupil.html?userName=${msg}`);
                }

            })
            .fail((xhr, status, error) => {
                console.error("failed send to server" + error);
            });
    });


});
