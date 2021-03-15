$(document).ready(function () {
    //alert("ready");
    getAllRole();
    getAllUser();

    $('#btnSaveUser').click(function () {
        let user = {};
        let role = [];
        let id = $('#userFormId').val();

        if(id !== '')user.id = id;
        user.firstName = $('#userFormFirstName').val();
        user.lastName = $('#userFormLastName').val();
        user.password = $('#userFormPassword').val();
        user.birthDate = $('#userFormBirthDate').val();
        user.telNumber = $('#userFormTelNumber').val();

        let eventTypes = document.forms['modalUserForm'].elements['rL[]'];

        for (let i=0, len=eventTypes.length; i<len; i++) {
            if (eventTypes[i].checked ) {
                role.push($(eventTypes[i]).val());
            }
        }
        $('#myModalUserForm').modal('hide');

        $.ajax({
            url: "admin/add_user",
            method: "POST",
            data: JSON.stringify({user,role}),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                // alert('Пользователь добавлен');
                getAllUser();
                // resetUser();
            },
            error: function (error) {
                alert(error);
            }
        })
    })

    $('#btnDeleteUser').click(function () {
        let id = $('#userFormId').val();
        deleteUser(id);
        $('#myModalUserForm').modal('hide');
    });

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

function showModalUserForm(action, id){
    resetUserForm();
    resetUserFormButton();

    //alert(action + ' ' + id);
    if(action==='ADD'){
        //alert(action + ' ' + id);
        $('#btnSaveUser').show();
        $('#btnAddUserResetForm').show();
        $('#editModalLongTitle').text("Добавить пользователя");
    }
    if(action==='EDIT'){
        //alert(action + ' ' + id);
        $('#btnSaveUser').show();
        $('#editModalLongTitle').text("Редактирование пользователя");
        getUserById(id);
    }
    if(action==='DEL'){
        //alert(action + ' ' + id);
        $('#btnDeleteUser').show();
        $('#editModalLongTitle').text("Удалить пользователя");
        getUserById(id);
    }

    $('#myModalUserForm').modal('show');
}

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
                    '<td><input type="button" value="Изменить" onclick="showModalUserForm(\'EDIT\','+ user.id + ')"\n' +
                    '                       class="btn btn-info"></td>' +
                    '<td><input type="button" value="Удалить" onclick="showModalUserForm(\'DEL\','+ user.id + ')"\n' +
                    '                       class="btn btn-danger"></td>' +
                    '</tr>');
            })
        },
        error: function (error) {
            alert(error);
        }
    })
}

function getUserById(id) {
    $.ajax({
        url: "admin/getuser/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            //alert(data.user);
            $(data).each(function (index, user) {
                //alert(user.id);
                $('#userFormId').val(user.id);
                $('#userFormFirstName').val(user.firstName);
                $('#userFormLastName').val(user.lastName);
                $('#userFormPassword').val(user.password);
                $('#userFormBirthDate').val(user.birthDate);
                $('#userFormTelNumber').val(user.telNumber);
                // var role = '';
                // $(user.roles).each(function (index, r) {
                //     role = role + r.name + '<br/>';
                // });
                //
                // tableBody.append('<tr>' +
                //     '<td>' + user.id + '</td>' +
                //     '<td>' + user.firstName + '</td>' +
                //     '<td>' + user.lastName + '</td>' +
                //     '<td>' + user.firstName + '</td>' +
                //     '<td>' + role + '</td>' +
                //     '<td>' + user.birthDate + '</td>' +
                //     '<td>' + user.telNumber + '</td>' +
                //     '<td><input type="button" value="Изменить" onclick="showModalUserForm(\'EDIT\','+ user.id + ')"\n' +
                //     '                       class="btn btn-info"></td>' +
                //     '<td><input type="button" value="Удалить" onclick="showModalUserForm(\'DEL\','+ user.id + ')"\n' +
                //     '                       class="btn btn-danger"></td>' +
                //     '</tr>');
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
            var userFormUserRole = $('#userFormUserRole');
            tableBody.empty();
            newUserRole.empty();
            userFormUserRole.empty();
            $(data).each(function (index, role) {
                tableBody.append('<tr><td>' + role.id + '</td>' +
                    '<td>' + role.name + '</td>' +
                    '<td><button onclick = "deleteRole(' + role.id + ')" class="btn btn-danger">Delete</button></td></tr>');
                newUserRole.append('<input className="form-check-input" id="rL" name="rL[]" value="' + role.id + '" type="checkbox"/>' +
                    '<label class="form-check-label">' + role.name + '</label><br/>');
                userFormUserRole.append('<input className="form-check-input" id="rL" name="rL[]" value="' + role.id + '" type="checkbox"/>' +
                    '<label class="form-check-label">' + role.name + '</label><br/>');
            })
        },
        error: function (error) {
            alert(error);
        }
    })
}

function deleteUser(id) {
    if (confirm('Подтверждение на удаление пользоваиеля с id=' + id + '. \nУдалить?')) {
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
    }
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

function resetUserForm() {
    $('#userFormId').val('');
    $('#userFormFirstName').val('');
    $('#userFormLastName').val('');
    $('#userFormPassword').val('');
    $('#userFormBirthDate').val('');
    $('#userFormTelNumber').val('');
    $("#userFormUserRole input[type=checkbox]").each(function () {
        $(this).prop("checked", false);
    });
}

function resetUserFormButton() {
    $('#btnSaveUser').hide();
    //$('#btnAddUserResetForm').hide();
    $('#btnAddNewUser').hide();
    $('#btnDeleteUser').hide();
}