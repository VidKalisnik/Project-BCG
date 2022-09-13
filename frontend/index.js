import { ethers } from "./ethers-5.6.esm.min.js";
import {
  abi,
  contractAddress,
  firstClassURIs,
  secondClassURIs,
} from "./constants.js";

const ethereumButton = document.querySelector(".connectBtn");
const mintBtn = document.getElementById("mintBtn");
const nftTypeBtn = document.getElementById("nftTypeBtn");

ethereumButton.addEventListener("click", () => {
  //Will Start the metamask extension
  ethereum.request({ method: "eth_requestAccounts" });
  ethereumButton.innerHTML = "Connected!";
});

mintBtn.addEventListener("click", async function () {
  const classType = document.getElementById("classSelection").value;
  mintBtn.innerHTML = "Waiting for the transaction...";
  if (typeof window.ethereum != "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    let URI;
    if (classType == "1") {
      console.log(await contract.getFirstC());
      URI = firstClassURIs[await contract.getFirstC()];
      await contract.increaceFirstC();
    } else if (classType == "2") {
      URI = secondClassURIs[await contract.getSecondC()];
      await contract.increaceSecondC();
    }

    try {
      const transactionResponse = await contract.mintNFT(URI);
      mintBtn.innerHTML = "Your nft is minted!";
    } catch (error) {
      mintBtn.innerHTML = "Error!";
      console.log(error);
    }
  }
});

nftTypeBtn.addEventListener("click", async function () {
  console.log(await getType());
  const type = await getType();

  if (type == "first class") {
    window.location.href = "accessPages/firstClass.html";
  } else if (type == "second class") {
    window.location.href = "accessPages/secondClass.html";
  }
});

async function getType() {
  let type;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, abi, signer);

  if (typeof window.ethereum != "undefined") {
    if ((await getAmountOfNFTs()) >= 1) {
      //console.log(await contract.getTokenId());
      type = fetch(await getMetaData(await contract.getTokenId()))
        .then((response) => response.json())
        .then((json) => json.attributes[0].value);
    }
  }
  return type;
}

async function getAmountOfNFTs() {
  let numberOfNFTs;
  if (typeof window.ethereum != "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      numberOfNFTs = await contract.balanceOf(await signer.getAddress());
    } catch (error) {
      console.log(error);
    }
  }
  return numberOfNFTs;
}

async function getMetaData(tokenId) {
  let metaData;
  if (typeof window.ethereum != "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      metaData = await contract.tokenURI(tokenId);
    } catch (error) {
      console.log(error);
    }
  }
  return metaData;
}
