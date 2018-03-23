$(document).ready(function() {
  sessionStorage.removeItem("currentBookId");
  $("#add-book").on("submit", function(e) {
    e.preventDefault();

    var title = $("#title").val();
    var category = $("#category").val();
    var excerpt = $("#excerpt").val();

    if (sessionStorage.getItem("currentBookId") != null) {
      var id = sessionStorage.getItem("currentBookId");
      var url = `https://api.mlab.com/api/1/databases/bookstoredev2/collections/books/${id}?apiKey=hf8swqrLaJ61XV-L6YWxOcBZX32_0pKF`;
      var type = 'PUT';
    } else {
      var url =
        "https://api.mlab.com/api/1/databases/bookstoredev2/collections/books?apiKey=hf8swqrLaJ61XV-L6YWxOcBZX32_0pKF";
      var type = 'POST';
    }

    $.ajax({
      url: url,
      data: JSON.stringify({
        title: title,
        category: category,
        excerpt: excerpt
      }),
      type: type,
      contentType: "application/json",
      success: function(data) {
        window.location.href = "index.html";
      },
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  });
  $("body").on("click", "#setBook", function(e) {
    e.preventDefault();
    sessionStorage.setItem("currentBookId", $(this).data("id"));
    $("#title").val($(this).data("title"));
    $("#category").val($(this).data("category"));
    $("#excerpt").val($(this).data("excerpt"));
  });
  $("body").on("click", "#deleteBook", function(e) {
    e.preventDefault();
    var id = ($(this).data("id"));
    var url = `https://api.mlab.com/api/1/databases/bookstoredev2/collections/books/${id}?apiKey=hf8swqrLaJ61XV-L6YWxOcBZX32_0pKF`;

    $.ajax({
      url: url,
      type: 'DELETE',
      async: true,
      timeout: 300000,
      success: function(data) {
        window.location.href = "index.html";
      },
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  });
});

function getBooks() {
  $.ajax({
    url:
      "https://api.mlab.com/api/1/databases/bookstoredev2/collections/books?apiKey=hf8swqrLaJ61XV-L6YWxOcBZX32_0pKF"
  }).done(function(data) {
    var output = "<div>";
    $.each(data, function(key, data) {
      output += `
      <div class="well">
        <h3>${data.title}</h3>
        <p>${data.category}</p>
        <p>${data.excerpt}</p>
        <a id="setBook" href="" data-id="${data._id.$oid}" data-title="${data.title}" data-category="${data.category}" data-excerpt="${data.excerpt}">Edit</a> |  <a href="" id="deleteBook" data-id="${data._id.$oid}" data-title="${data.title}" data-category="${data.category}" data-excerpt="${data.excerpt}">Delete</a>
      </div>
      `;
      // console.log(key);
      // output += '<div class="well">';
      // output += '<h3>'+data.title+'</h3>';
      // output += '<p>category: '+data.category+'</p>';
      // output += '<p>'+data.excerpt+'</p>';
      // output += '</div>';
    });
    output += "</div>";
    $("#books").html(output);
  });
}
