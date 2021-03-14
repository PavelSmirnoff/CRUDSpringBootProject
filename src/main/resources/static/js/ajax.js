$(document).ready(function () {
    //alert("ready");
    getAllRole();
    getAllUser();
    var role = {};
    $('#btnAddRole').click(function () {
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
            tableBody.empty();
            $(data).each(function (index, role) {
                tableBody.append('<tr><td>' + role.id + '</td><td>' + role.name + '</td><td><button onclick = "deleteRole(' + role.id + ')" class="btn btn-danger">Delete</button></td></tr>');
            })
        },
        error: function (error) {
            alert(error);
        }
    })
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