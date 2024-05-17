$(function() {
  let number = 0;
  const button = $("#btn");
  const videoArea = $("#video");
  const titleArea = $("#title");
  const contentArea = $("#content");

  function getData() {
    return $.ajax('ajax.json', {
      type: 'GET',
      dataType: 'json'
    });
  }

  function changeVideo() {
    button.click(function(){
      getData().then(function(data){
        if (data && data.length > 0) {
          const videoData = data[number];
          videoArea.attr('src', videoData.url);
          titleArea.text(videoData.title);
          contentArea.text(videoData.content);
          
          // numberを更新し、次の動画に移動
          number = (number + 1) % data.length;
        } else {
          console.error("Data not found or empty");
        }
      }).fail(function(xhr, status, error) {
        console.error("Error fetching data:", error);
      });
    });
  };

  // 初期化
  videoArea.attr('src', ''); // 動画を初期化
  titleArea.text(''); // タイトルを初期化
  contentArea.text(''); // コンテンツを初期化

  changeVideo(); // ボタンクリック時の処理を設定
});