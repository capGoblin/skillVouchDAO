/* eslint-disable no-console */
import axios from "axios";
import FormData from "form-data";

// import fs from 'fs';
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1ODJhZjYyNC00Mjk1LTQ4MWItOTE0OC00NzUyZWJiOGI3NzMiLCJlbWFpbCI6ImRoYXJzaGFuMjQ1N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZmZiNzQ1ZGNkY2FjNGYyZGM3YjgiLCJzY29wZWRLZXlTZWNyZXQiOiI5ZjY3NTcxMTUwYWRiNDI2ZjMzN2JjYmNjNDM0YTdiZDE3ZGU1ZDMxMWZmY2Q2ZDQwYmE5ZGVmZTNiNThhMDlmIiwiZXhwIjoxNzUwOTUzNjQzfQ.Vp-zM90Wu-qoBhSMUVJ8puocHQlCdEo8YfeVvwk5mH4";
// const API Secret = 010124bccee4072877c367fc5ff1aca63d857be2b7d15e4899b6fbb7e77e6e8c
// const API Key = bf922979118c6952da89

// @ts-expect-error
export async function uploadJSONToIPFS(JSONBody) {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  // making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: `ffb745dcdcac4f2dc7b8`,
        pinata_secret_api_key: `9f67571150adb426f337bcbcc434a7bd17de5d311ffcd6d40ba9defe3b58a09f`,
      },
    })
    .then((response) => {
      console.log(response.data);
      return {
        success: true,
        data: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        success: false,
        data: error.message,
      };
    });
}

// @ts-expect-error
// export async function pinFileToIPFS(file) {
//   const formData = new FormData();
//   // const src = "../public/2.png";

//   // const file = fs.createReadStream(src);
//   formData.append("file", file);

//   const pinataMetadata = JSON.stringify({
//     name: "File name",
//   });
//   formData.append("pinataMetadata", pinataMetadata);

//   // const pinataOptions = JSON.stringify({
//   //   cidVersion: 0,
//   // });
//   // formData.append("pinataOptions", pinataOptions);
//   console.log(formData);
//   try {
//     const res = await axios.post(
//       "https://api.pinata.cloud/pinning/pinFileToIPFS",
//       formData,
//       {
//         headers: {
//           pinata_api_key: `ffb745dcdcac4f2dc7b8`,
//           pinata_secret_api_key: `9f67571150adb426f337bcbcc434a7bd17de5d311ffcd6d40ba9defe3b58a09f`,
//           "Content-Type": `multipart/form-data`,
//           // Authorization: `Bearer ${JWT}`,
//         },
//       }
//     );
//     console.log(res.data);
//     return {
//       success: true,
//       pinataURL: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }
// pinFileToIPFS();

export const pinFileToIPFS = async (file) => {
  try {
    let data = new FormData();
    data.append("file", file);
    // data.append('pinataOptions', '{"cidVersion": 0}')
    // data.append('pinataMetadata', '{"name": "pinnie"}')

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    console.log(res.data);
    console.log(
      `View the file here: https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
    );
    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  } catch (error) {
    console.log(error);
  }
};
