document.getElementById("button").addEventListener("click", function() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("https://graph.instagram.com/17846952373116369?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJYeDBaRTVkQ3BySGlvemZAYeTdHZAWg2aDFESkxtSDJlcGFaaFR1aTRtWmU1UnVJTGF1X0pkcDg1SDVDbGxmQnNkd1F5YWtLLWN2aEJ0bG53MHVFRjd2TlpBTDEybGtaVk9QWVRR", requestOptions)
    .then(response => response.json())
    .then(data => {
      var picUrl = data["media_url"];

      document.getElementById("output").innerHTML = "<img src=\"" + picUrl + "\" alt=\"Bild 1\"></img>";
    })

});
