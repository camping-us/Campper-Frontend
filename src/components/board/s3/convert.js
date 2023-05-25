import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

async function convertFileData(data) {
  let albumBucketName = process.env.VUE_APP_ALBUM_BUCKET_NAME;
  let bucketRegion = process.env.VUE_APP_BUCKET_REGION;
  let IdentityPoolId = process.env.VUE_APP_IDENTITY_POOL_ID;
  console.log("AA:" + albumBucketName);
  // content에서 사진 url 최적화
  let base64Match = Array.from(data.matchAll(/<img[^>]+src=["']([^'">]+)['"]/gi));
  let fileData = base64Match.map((item) => item.pop() || "");

  let base64ToFiles = [];
  for (let i = 0; i < fileData.length; i++) {
    let arr = fileData[i].split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let fileExtension = mime.substring("image/".length, mime.length);
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    base64ToFiles.push(new File([u8arr], `${i}.${uuidv4()}.${fileExtension}`, { type: mime }));
  }

  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId,
    }),
  });

  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: albumBucketName },
  });

  let contentImages = [];

  function promiseTest() {
    return new Promise(function (resolve) {
      for (let i = 0; i < base64ToFiles.length; i++) {
        let photoKey = base64ToFiles[i].name;
        s3.upload(
          {
            Key: photoKey,
            Body: base64ToFiles[i],
            ACL: "public-read",
          },
          (err, data) => {
            if (err) {
              console.log(err);
            }
            contentImages.push(data.Location);
            resolve();
          }
        );
      }
    });
  }

  let afterContent = data;
  function test() {
    for (let i = 0; i < fileData.length; i++) {
      afterContent = afterContent.replaceAll(fileData[i], contentImages[i]);
    }
  }

  if (fileData.length > 0) {
    await promiseTest().then(function () {
      test();
    });
  }

  return afterContent;
}

export { convertFileData };
