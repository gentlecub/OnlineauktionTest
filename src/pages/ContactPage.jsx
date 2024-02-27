
function ContactPage() {

  function sendMessage() {
    alert("Message sent!")
  }

  return <>
    <main>
      <div class="contact">
        <div class="form-group">
          <label for="exampleFormControlInput1">your email</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="namn@exempel.se" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Your Message</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div class="d-flex justify-content-end">
          <button type="button" onClick={sendMessage} class="btn btn-outline-dark">Send your message</button>
        </div>
      </div>
    </main>
  </>

}

export default ContactPage
