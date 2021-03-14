$(document).ready(function () {
    //alert("ready");
    getAllRole();
    getAllUser();

    $('#btnAddUser').click(function () {
        let user = {};
        let role = [];
        user.firstName = $('#newUserfirstName').val();
        user.lastName = $('#newUserlastName').val();
        user.password = $('#newUserpassword').val();
        user.birthDate = $('#newUserbirthDate').val();
        user.telNumber = $('#newUsertelNumber').val();
        //role = $('#rL:checked').serialize();

        let eventTypes = document.forms['newUserForm'].elements['rL[]'];

        for (let i=0, len=eventTypes.length; i<len; i++) {
            if (eventTypes[i].checked ) {
                role.push($(eventTypes[i]).val());
            }
        }

        $.ajax({
            url: "admin/add_user",
            method: "POST",
            data: JSON.stringify({user,role}),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                alert('Пользователь добавлен');
                getAllUser();
                resetUser();
            },
            error: function (error) {
                alert(error);
            }
        })
    })

    $('#btnAddRole').click(function () {
        var role = {};
        role.name = $('#roleName').val();
        var roleObj = JSON.stringify(role);
        $.ajax({
            url: "admin/add_role",
            method: "POST",
            data: roleObj,
            contentType: 'application/json; charset=utf-8',
            success: function () {
                // alert('Saved successfully');
                getAllRole();
                getAllUser();
                resetRole();
            },
            error: function (error) {
                alert(error);
            }
        })
    })


})

function getAllUser() {
    $.ajax({
        url: "admin/alluser",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var tableBody = $('#tblUser tbody');
            tableBody.empty();

            $(data).each(function (index, user) {
                var role = '';
                $(user.roles).each(function (index, r) {
                    role = role + r.name + '<br/>';
                });

                tableBody.append('<tr>' +
                    '<td>' + user.id + '</td>' +
                    '<td>' + user.firstName + '</td>' +
                    '<td>' + user.lastName + '</td>' +
                    '<td>' + user.firstName + '</td>' +
                    '<td>' + role + '</td>' +
                    '<td>' + user.birthDate + '</td>' +
                    '<td>' + user.telNumber + '</td>' +
                    '<td>Изменить</td>' +
                    '<td>Удалить</td>' +
                    '</tr>');
            })
        },
        error: function (error) {
            alert(error);
        }
    })
}

function getAllRole() {
    //alert("getAllRole");
    $.ajax({
        url: "admin/allrole",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var tableBody = $('#tblRole tbody');
            var newUserRole = $('#divNewUserRole');
            tableBody.empty();
            newUserRole.empty();
            $(data).each(function (index, role) {
                tableBody.append('<tr><td>' + role.id + '</td>' +
                    '<td>' + role.name + '</td>' +
                    '<td><button onclick = "deleteRole(' + role.id + ')" class="btn btn-danger">Delete</button></td></tr>');
                newUserRole.append('<input className="form-check-input" id="rL" name="rL[]" value="' + role.id + '" type="checkbox"/>' +
                    '<label class="form-check-label">' + role.name + '</label><br/>');
            })
        },
        error: function (error) {
            alert(error);
        }
    })
}

function deleteUser(id) {
    //if (confirm('Подтверждение на  роли id=' + id + '. \nУдалить?')) {
    $.ajax({
        url: 'admin/deluser/' + id,
        method: 'GET',
        success: function () {
            //alert('record has been deleted');
            getAllUser();
        },
        error: function (error) {
            alert(error);
        }
    })
    //}
}

function deleteRole(id) {
    if (confirm('Подтверждение на удаление роли id=' + id + '. \nУдалить?')) {
        $.ajax({
            url: 'admin/delrole/' + id,
            method: 'GET',
            success: function () {
                //alert('record has been deleted');
                getAllRole();
                getAllUser();
            },
            error: function (error) {
                alert(error);
            }
        })
    }
}

function resetRole() {
    $('#roleName').val('');
}

function resetUser() {
    $('#newUserfirstName').val('');
    $('#newUserlastName').val('');
    $('#newUserpassword').val('');
    $('#newUserbirthDate').val('');
    $('#newUsertelNumber').val('');
    $("#newUserForm input[type=checkbox]").each(function () {
        $(this).prop("checked", false);
    });
}