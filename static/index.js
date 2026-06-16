console.log('js file loaded !!!!!')


const base_url = `${window.location.protocol}//${window.location.host}`;

// user query search handler logic
const search_query_button= document.getElementById('search_query_button')
const search_query_input= document.getElementById('search_query_input')
const input_form= document.getElementById('input_form')


function* generate_image_url(image_array) {
  for (const el of image_array) {
    yield el;
  }
}

const image_card= document.getElementById('image_card')
// const image_card_container= document.getElementById('image_card_container')
// const image_download_button= document.getElementById("download_button")

const image_card_clones= []

const info_text= document.getElementById('info_text')
const error_block= document.getElementById('error_message')

search_query_button.addEventListener( 'click', async (event)=>
{
  
  console.log( "search_query_button clicked !! , preventing event defaults proceeding to logic handling for clicked button".toUpperCase())
  // prevent default events
  event.preventDefault()

  // remove populated elements for new requests
  if (image_card_clones.length > 0) 
  {
    // let card_clone
    image_card_clones.forEach((card_clone)=>{
      card_clone.remove()
    })
    console.log( "cloned card elements removed !".toUpperCase() )
  }

  // reset ui elements on request
  error_block.style.display= "none"
  info_text.innerText= "loading ..."
  info_text.style.letterSpacing= "1px"

  const user_query= search_query_input.value

  console.log("user_query", user_query)

  // logic handler on succesful user request
  if( user_query&& user_query!== "" )
  {

    // disable input buttons
    search_query_button.disabled= true
    search_query_button.style.pointerEvents= "none"
    console.log("disabling input buttons !")

    // adding the try catch section to the code later

    console.log( "sending user request to backend".toUpperCase())

    const user_request= await fetch( `${base_url}//download`, 
    {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "user_query": user_query} )
    })

    // show user request states
    info_text.innerText= "processing link !"

    const image_search_response=  await user_request.json()

    console.log( "server Response", image_search_response)

    // if server returns image array execute this
    if (image_search_response?.status === "bad")
    {
      // re-enable disabled buttons
      console.log("search button re-enabled !")
      search_query_button.disabled= false
      search_query_button.style.pointerEvents= "auto"

      // update ui reponse on user success request
      console.log( "user request UNsuccesfull !!!")
      // info_text.innerText= "request failed, try again."
      info_text.innerText= "request failed, try again..."

    }
    // executes on succesfull user response== images are available
    else
    {
      // re-enable disabled buttons
      console.log("search button re-enabled !")
      search_query_button.disabled= false
      search_query_button.style.pointerEvents= "auto"

      let image_array= ""
      image_array= image_search_response?.content
      
      console.log("images", image_array)
      console.log("number of images", image_array.length)
      
      if(image_array && image_array.length !==0 )
      {

        // update ui reponse on user success request
        console.log( "user request succesfull !!!")
        info_text.innerText= "link succesfully processed !"

        image_array.forEach( (element)=>
        {
          let image_card_clone= image_card.cloneNode(true)
          for ( const image_url of generate_image_url(image_array) )
          {
            console.log("image_url:", image_url)

            // console.log( "image_card_clone", image_card_clone )

            // image_card_clone.querySelector("img").src= ""
            image_card_clone.querySelector("img").src= image_url
            image_card_clone.querySelector("button").url= image_url


            console.log("new element created and loaded to dom")
            console.log( "new image assigned url to image and button" )

            // image_card_container.appendChild(image_card_clone)
            image_card.after(image_card_clone)

            image_card_clone.style.display= "flex"

            image_card_clones.push(image_card_clone)
          }
        })
      }
      // for error in user request 
      // (image_search_response && image_search_response?.statuss !== "good")
      else 
      {
        console.log("an error ocurred response status is bad (backend centric) !!!......")
        
        // re-enable disabled buttons
        console.log("search button re-enabled !")
        search_query_button.disabled= false
        search_query_button.style.pointerEvents= "auto"

        // show user request states
        info_text.innerText= `${image_search_response.content}`
        error_block.style.display= "block"
      }
    }  
  }
  // for invalid query input
  else
  {
    console.log("an error occured !!!......")

    // re-enable disabled buttons
    console.log("search button re-enabled !")
    search_query_button.disabled= false
    search_query_button.style.pointerEvents= "auto"

    // show user request states
    info_text.innerText= "invalid request !"
    error_block.style.display= "block"
  }
})




// image download button handler logic
document.body.addEventListener('click', async (event)=>
{
  try
  {      
    if (event.target.id== 'download_button')
    {
      console.log("download button clicked")
      let similar_download_buttons= document.querySelectorAll(".download_button")
      similar_download_buttons= Array.from(similar_download_buttons)
      
      // console.log("similar_download_buttons :", similar_download_buttons)
      console.log("image_download_button clicked ".toUpperCase())
      
      // unsued
      // disable similar download button elements
      similar_download_buttons.forEach((element)=>
        {
          // element.disabled= true
          // element.style.pointerEvents= "none"
          console.log("button id:", element.id)
        })

        const clicked_download_button= event.target
        
        // display download request state 
        info_text.innerText= "processing download"
        info_text.style.letterSpacing= "1px"
        
        const download_request= await fetch(`${base_url}//serve`, {
          
          headers: { 'Content-Type': 'application/json' } ,
          method: "POST",
          body: JSON.stringify( { "user_query" : `${event.target.url}` } )
        })
        
        let response= await download_request.json()
        
        console.log("response received", response)

        // update ui on response state
        // if(){}
        // else{}
      }
      else
      {
        console.log( "another element got clicked".toUpperCase() )
      }

  }
  catch(err)
  {
    console.log("an error occured !")
    console.log("error :", err)
  }
  
})