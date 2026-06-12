console.log('js file loaded !!!!!')






const search_query_button= document.getElementById('search_query_button')
const search_query_input= document.getElementById('search_query_input')


function send_user_search_query_to_backend(event_data, cliked_button, input_element ) 
{

  // first disable input element
  input_element.disabled= true
  input_element.style.opacity= .5

  let user_query= input_element.value

  const request= await fetch("embedded/endpointto return result",
  {
    method:"POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({user_request: user_query})
  })

  const response_data= await request.json()

  // check for errors
  if (response_data.status== 'good')
  {
    // ...
  }
  else
  {
    // ...
  }

  // reenabled input
  input_element.disabled= false
  input_element.style.opacity= 1
}



// relevant variables
const movie_card= document.getElementById("movie_card")
const movies_container= document.getElementById("movies_container")

function populate_dom_with_search_results(search_result, display_block, display_card )
{


}