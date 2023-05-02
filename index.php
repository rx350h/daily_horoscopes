<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily Horoscope</title>
</head>
<body>
<script src="./assets/horoscope_new.js"></script>

<form class='app-horoscope d-flex justify-content-center align-items-center' style='margin-bottom: 50px;'>
    <div class='col-md-12 shadow-sm p-5'>
      <h3 class='text-center'>
        Your horoscope for tomorrow
      </h3>
      <div class='form-group'>
        <div class='form-row d-flex justify-content-center align-items-center sign'>
          <div class="radio-group">
            <div class="row">
              <input type="radio" id="Capricorn" name="group-1" value="Capricorn">
              <label for="Capricorn"><img src="./assets/img/signs/Capricorn.png"
                  height="64"></label>
              <input type="radio" id="Aquarius" name="group-1" value="Aquarius">
              <label for="Aquarius"><img src="./assets//img/signs/Aquarius.png"
                  height="64"></label>
              <input type="radio" id="Pisces" name="group-1" value="Pisces">
              <label for="Pisces"><img src="./assets//img/signs/Pisces.png"
                  height="64"></label>
              <input type="radio" id="Aries" name="group-1" value="Aries">
              <label for="Aries"><img src="./assets//img/signs/Aries.png" height="64"></label>
            </div>
            <div class="row">
              <input type="radio" id="Taurus" name="group-1" value="Taurus">
              <label for="Taurus"><img src="./assets//img/signs/Taurus.png"
                  height="64"></label>
              <input type="radio" id="Gemini" name="group-1" value="Gemini">
              <label for="Gemini"><img src="./assets//img/signs/Gemini.png"
                  height="64"></label>
              <input type="radio" id="Cancer" name="group-1" value="Cancer">
              <label for="Cancer"><img src="./assets//img/signs/Cancer.png"
                  height="64"></label>
              <input type="radio" id="Leo" name="group-1" value="Leo">
              <label for="Leo"><img src="./assets//img/signs/Leo.png" height="64"></label>
            </div>
            <div class="row">
              <input type="radio" id="Virgo" name="group-1" value="Virgo">
              <label for="Virgo"><img src="./assets//img/signs/Virgo.png" height="64"></label>
              <input type="radio" id="Libra" name="group-1" value="Libra">
              <label for="Libra"><img src="./assets//img/signs/Libra.png" height="64"></label>
              <input type="radio" id="Scorpio" name="group-1" value="Scorpio">
              <label for="Scorpio"><img src="./assets//img/signs/Scorpio.png"
                  height="64"></label>
              <input type="radio" id="Sagittarius" name="group-1" value="Sagittarius">
              <label for="Sagittarius"><img src="./assets//img/signs/Sagittarius.png"
                  height="64"></label>
            </div>
          </div>
        </div>
      </div>
  
      <div class='form-group text-center'>
        <div class='for-capcha'></div>
        <button type='button' class='send btn btn-info btn-block'>
          Get
        </button>
        <div class="modal-body text-center" style="display: none">
          <button type="button" class="btn btn-primary">
            Show
          </button>
        </div>
        <div class="progress" style="display: none">
          <div class="progress-bar"></div>
        </div>
        <div class='result p-5' style='color: #000;'></div>
        <div class="message" style="text-align: center"></div>
      </div>
    </div>
  </form>
       
<?php $main_url = $_SERVER['HTTP_HOST'];?>

<input type="hidden" id="next_page" value='/index.php'> 
	  
<input type="hidden" class="lang" value="en">

<input type="hidden" id="calculating" value="Please wait...">

</body>
</html>