console.log("Sanity Check: JS is working!");

$(document).ready(function(){

// your code
var $flowersList;
var allFlowers = [];

$(document).ready(function(){

  $flowersList = $('#flowerTarget');

  $.ajax({
    method: 'GET',
    url: '/api/flowers',
    success: handleSuccess,
    error: handleError
  });

  $('#newFlowerForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/flowers',
      data: $(this).serialize(),
      success: newFlowerSuccess,
      error: newFlowerError
    });
  });

  $flowersList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/flowers/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/flowers/'+$(this).attr('data-id'),
      success: deleteFlowerSuccess,
      error: deleteFlowerError
    });
  });

});


function getFlowerHtml(flower) {
  return `<hr>
          <p>
          	<img src="${flower.image}"></img>
            <b>${flower.name}:</b>
            <b>${flower.popularColors}</b>
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${flower._id}>Delete</button>
          </p>`;
}

function getAllFlowersHtml(flowers) {
  return flowers.map(getFlowerHtml).join("");
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $flowersList.empty();

  // pass `allFlowers` into the template function
  var flowersHtml = getAllFlowersHtml(allFlowers);

  // append html to the view
  $flowersList.append(flowersHtml);
};

function handleSuccess(json) {
  allFlowers = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#flowerTarget').text('Failed to load flowers, is the server working?');
}

function newFlowerSuccess(json) {
  $('#newFlowerForm input').val('');
  allFlowers.push(json);
  render();
}

function newFlowerError() {
  console.log('newflower error!');
}

function deleteFlowerSuccess(json) {
  var flower = json;
  console.log(json);
  var flowerId = flower._id;
  console.log('destroy flower', flowerId);
  // find the flower with the correct ID and remove it from our allFlowers array
  for(var index = 0; index < allFlowers.length; index++) {
    if(allFlowers[index]._id === flowerId) {
      allFlowers.splice(index, 1);
      break;  // we found our flower - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteFlowerError() {
  console.log('deleteflower error!');
}


});
