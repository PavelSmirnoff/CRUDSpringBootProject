$(document).ready(function () {
    //alert("ready");
    getAllRole();
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
                resetRole();
            },
            error: function (error) {
                alert(error);
            }
        })

    })
})

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