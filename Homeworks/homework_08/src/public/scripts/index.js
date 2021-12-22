const EncodeToken = require('../../../artifacts/contracts/ERC721.sol/EncodeToken.json');
const { BigNumber, ethers, utils } = require("ethers");

document.addEventListener('click', async (event) => {
  const ele = event.target;
  if (ele.matches('#add-text-btn')) {
      await addText();
  } else if (ele.matches('#add-image-btn')) {
      addImage();
  } else if (ele.matches('#get-data-btn')) {
      getText();
  } else if (ele.matches('#get-image-btn')) {
      getImage();
  } 
}, false)

async function addText() {
  const textInput = document.getElementById('text-input');
  const { data }= await axios.post('/api/ipfs', { text: textInput.value });
  displayText(data);
}


async function addImage() {
  const imageInput = document.getElementById('image-input');
  const reader = new FileReader();

  reader.onloadend = async () => {
      const buff = buffer.Buffer(reader.result) // Convert data into buffer
      const { data } = await axios.post('/api/ipfs', { image: buff });
      displayText(data);
  }
  reader.readAsArrayBuffer(imageInput.files[0]);
}

async function getText() {
  const data = await getData();
  displayText(data);
}


async function getImage() {
  const data = await getData();
  displayImage(data);
}

async function getData() {
  const cid = getCid();
  const { data } = await axios.get(`/api/ipfs/${cid}`);

  return data;
}

function getCid() {
  const cidInput = document.getElementById('cid-input');
  return cidInput.value;
}

function displayText(text) {
  const data = document.getElementById('data-anchor');
  data.innerHTML = `<a> ${text} </a>`;
};

function displayImage(buffer) {
  const data = document.getElementById('data-anchor');
  data.innerHTML = `<img src="data:image/png;base64,${buffer}"></img>`;
}

const nftAddress = 0x29CbaB247f984d4e17591f89EE4d6E4F53B629F1

async function mintNft() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "rinkeby");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(nftAddress, EncodeToken.abi, signer);

  const TokenURI = document.getElementById('mint-data');
  const TokenURI_ = TokenURI.value;
  const owner = document.getElementById('mint-owner');
  const mint = await contract.mint(TokenURI_, owner.value);
  console.log(mint);
  const result = await contract.wait();
  displayText(JSON.stringify(result), 'data-nft-anchor');
}

async function getNft() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "rinkeby");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(nftAddress, EncodeToken.abi, signer);

  const address = document.getElementById('get-nft-address');
  const address_ = address.value;
  const nfts = await contract.balanceOf(address_);
  const resultNft = nfts.map(nft => {
    return {
      id: nft.id,
      tokenURI: nft.tokenURI,
    }
  })
  displayText(JSON.stringify(resultNft), 'data-nft-anchor');
}

async function transfer() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "rinkeby");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(nftAddress, EncodeToken.abi, signer);

  const to = document.getElementById('to');
  const id = document.getElementById('id');

  const transfer = await contract.transferToken(utils.getAddress(to.value), BigNumber.from(id.value));
  const result = await transfer.wait();
  displayText(JSON.stringify(result), 'data-nft-anchor');
}