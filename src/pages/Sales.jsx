import React, { Suspense, useRef, useState, useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import { FullscreenImg } from '../components/fullscreenImg';
import HAIRPLAY1 from '../assets/img/gallery/HAIRPLAY1.png';
import HAIRPLAY2 from '../assets/img/gallery/HAIRPLAY2.png';
import HAIRPLAY3 from '../assets/img/gallery/HAIRPLAY3.png';
import HAIRPLAY4 from '../assets/img/gallery/HAIRPLAY4.png';
import HAIRPLAY5 from '../assets/img/gallery/HAIRPLAY5.png';
import MONKEYKISS1 from '../assets/img/gallery/MONKEYKISS1.png';
import MONKEYKISS2 from '../assets/img/gallery/MONKEYKISS2.png';
import MONKEYKISS3 from '../assets/img/gallery/MONKEYKISS3.png';
import MONKEYKISS4 from '../assets/img/gallery/MONKEYKISS4.png';
import MONKEYKISS5 from '../assets/img/gallery/MONKEYKISS5.png';
import THOSEEYES1 from '../assets/img/gallery/THOSEEYES1.png';
import THOSEEYES2 from '../assets/img/gallery/THOSEEYES2.png';
import THOSEEYES3 from '../assets/img/gallery/THOSEEYES3.png';
import THOSEEYES4 from '../assets/img/gallery/THOSEEYES4.png';
import THOSEEYES5 from '../assets/img/gallery/THOSEEYES5.png';
import '../assets/css/sales.scss';
import { Fullscreen3d } from '../components/fullscreen3d';
import Web3 from 'web3';
import { NFT_ABI } from '../contract/NFT';
import { toast } from 'react-toastify';
import { Loader } from '../components/loader';

function ModelHair(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('/hair.glb');

  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    Object.keys(actions).map((key) => {
      actions[key].play();
    });
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

function ModelKiss(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('/kiss.glb');

  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    Object.keys(actions).map((key) => {
      actions[key].play();
    });
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

function ModelEye(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('/eye.glb');

  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    Object.keys(actions).map((key) => {
      actions[key].play();
    });
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

export const Sales = () => {
  const [isShowFullscreenImg, setShowFullscreenImg] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [isShowFullscreen3d, setShowFullscreen3d] = useState(false);
  const [selected3d, setSelected3d] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [hairAmount, setHairAmount] = useState(0);
  const [kissAmount, setKissAmount] = useState(0);
  const [eyesAmount, setEyesAmount] = useState(0);
  const [canMint, setCanMint] = useState(false);

  const { activateBrowserWallet, account, library } = useEthers();

  useEffect(() => {
    handleContractStatus();
  }, [account]);

  const handleContractStatus = async () => {
    if (library) {
      const web3 = new Web3(library.provider);
      const contract = new web3.eth.Contract(NFT_ABI, '0xdFB95Fc9D00153e348c32A2cF4B120222ED3Aeb9');

      const presaleActive = await contract.methods.presaleActive().call();
      const publicSaleActive = await contract.methods.publicSaleActive().call();

      if (presaleActive || publicSaleActive) {
        setCanMint(true);
      }
    }
  };

  const handleMint = async (type) => {
    if (!account) {
      activateBrowserWallet();
    } else {
      let currentAmount = hairAmount;
      if (type === 2) {
        currentAmount = kissAmount;
      } else if (type === 3) {
        currentAmount = eyesAmount;
      }

      if (currentAmount > 0) {
        setIsMinting(true);
        try {
          const web3 = new Web3(library.provider);
          const contract = new web3.eth.Contract(
            NFT_ABI,
            '0xdFB95Fc9D00153e348c32A2cF4B120222ED3Aeb9'
          );
          const price = await contract.methods.currentPrice().call();
          await contract.methods.mint(type, currentAmount).send({
            from: account,
            value: price * currentAmount
          });
          setIsMinting(false);
          toast('NFT minted successfully!', { type: 'success' });
        } catch (e) {
          setIsMinting(false);
          toast('There is problem on minting, Please try again later!', { type: 'error' });
        }
      } else {
        toast('Please input amount of NFT which you need to mint!', {
          type: 'warning'
        });
      }
    }
  };

  const handleSelectImg = (img) => {
    setSelectedImg(img);
    setShowFullscreenImg(true);
  };
  const handleShowFullscreen3dModel = (type) => {
    let model = null;
    if (type === 'hair') {
      model = (
        <Canvas camera={{ position: [0, 0, 50], fov: 50 }}>
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <ModelHair />
          </Suspense>
          <OrbitControls />
        </Canvas>
      );
    } else if (type === 'kiss') {
      model = (
        <Canvas camera={{ position: [0, 0, 50], fov: 50 }}>
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <ModelKiss />
          </Suspense>
          <OrbitControls />
        </Canvas>
      );
    } else {
      model = (
        <Canvas camera={{ position: [0, 0, 50], fov: 50 }}>
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <ModelEye />
          </Suspense>
          <OrbitControls />
        </Canvas>
      );
    }
    setSelected3d(model);
    setShowFullscreen3d(true);
  };

  const hairPlayImages = [0, 1, 2, 3, 4, 5].map((value) => {
    return {
      src: `/img/gallery/HAIRPLAY${value + 1}.png`,
      thumbnail: `/img/thumbnails/HAIRPLAY${value + 1}.png`
    };
  });
  const monkeyKissImages = [0, 1, 2, 3, 4, 5].map((value) => {
    return {
      src: `/img/gallery/MONKEYKISS${value + 1}.png`,
      thumbnail: `/img/thumbnails/MONKEYKISS${value + 1}.png`
    };
  });
  const thoseEyesImages = [0, 1, 2, 3, 4, 5].map((value) => {
    return {
      src: `/img/gallery/THOSEEYES${value + 1}.png`,
      thumbnail: `/img/thumbnails/THOSEEYES${value + 1}.png`
    };
  });

  return (
    <div id="sales" className=" scroller" style={{ marginTop: '120px' }}>
      <div className="contain">
        <div className="content1">
          <div className="title">THE MEMORY MINT</div>
          <div className="paragraph">THE SOMMER SHIELS COLLECTION</div>
        </div>
        <div className="content2">
          <div className="title">ABOUT THE COLLECTION</div>
          <div className="paragraph">
            Sommer Shiels is a journalist, beauty industry expert and travel blogger. These memories
            were created in 2019 while on-location shooting the documentary, "Origins of Beauty".
          </div>
        </div>
        <div className="content3">
          <div className="title">SERIES A:</div>
          <div className="paragraph1">LIMIT 1098</div>
          <div className="paragraph2">
            "On January 23, 2019, I se sail from lquitos, Peru for the headwaters of the upper
            Ucayali River to meet with a Shipibo-Conibo ayahuasca medicine worker. Once there, I
            made friends with this precious monkey! This little guy clung to me like I was its
            mother, while it played with my hair and made kissing sounds at me. Looking into those
            deep brown eyes immediately takes me back to that most amazing time in my life. I was at
            this village for a little over six hours on this trip, so I'm limiting each of these to
            only 366 immersive NFTs, one for every minute I spent with my monkey friend."
          </div>
        </div>
        <div className="content4">
          <div className="service" id="servicePlaying">
            <div className="pricing-table">
              <div className="left-table">
                <div className="header">
                  <p className="title">"PLAYING WITH MY HAIR"</p>
                  <p className="paragraph">Pre-sale Now Available</p>
                </div>
                <div className="content-top">
                  <span>ETH</span>
                  <span>.07</span>
                  <span>/66</span>
                </div>
                <div className="content-bottom">
                  <ul>
                    <li>
                      <span>Only 66 available for pre-sale.</span>
                    </li>
                    <li>
                      <span>Available exclusively on our website until March 4, 2022.</span>
                    </li>
                    <li>
                      <span>
                        Every Memory Mint entitles its holder to their own Memory Vault (coming
                        soon).
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="content-amount">
                  {canMint ? (
                    <input
                      type="number"
                      className="nft-amount"
                      onChange={(e) => setHairAmount(e.target.value)}
                    />
                  ) : (
                    <input type="number" className="nft-amount" disabled />
                  )}
                </div>
                <div className="content-btn">
                  <a
                    href="#"
                    className="btn btn-custom"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMint(1);
                    }}>
                    {account ? 'MINT' : 'CONNECT WALLET'}
                  </a>
                </div>
              </div>
              <div className="right-table">
                <div className="header">
                  <p className="title">"PLAYING WITH MY HAIR"</p>
                  <p className="paragraph">General Sale Begin TBD</p>
                </div>
                <div className="content-top">
                  <span>ETH</span>
                  <span>.08</span>
                  <span>/266</span>
                </div>
                <div className="content-bottom">
                  <ul>
                    <li>
                      <span>266 available for general sale across all platforms.</span>
                    </li>
                    <li>
                      <span>34 to be held in reserve.</span>
                    </li>
                    <li>
                      <span>
                        Every Memory Mint entitles its holder to their own Memory Vault (coming
                        soon).
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="pricing-view">
              <img alt="" src={HAIRPLAY1} onClick={() => handleSelectImg(HAIRPLAY1)} />
              <img alt="" src={HAIRPLAY2} onClick={() => handleSelectImg(HAIRPLAY2)} />
              <img alt="" src={HAIRPLAY3} onClick={() => handleSelectImg(HAIRPLAY3)} />
              <img alt="" src={HAIRPLAY4} onClick={() => handleSelectImg(HAIRPLAY4)} />
              <img alt="" src={HAIRPLAY5} onClick={() => handleSelectImg(HAIRPLAY5)} />
              <div className="click-view" onClick={() => handleShowFullscreen3dModel('hair')}>
                Launch Model
              </div>
            </div>
          </div>
          <div className="service" id="serviceKiss">
            <div className="pricing-table">
              <div className="left-table">
                <div className="header">
                  <p className="title">"MONKEY KISS"</p>
                  <p className="paragraph">Pre-sale Now Available</p>
                </div>
                <div className="content-top">
                  <span>ETH</span>
                  <span>.07</span>
                  <span>/66</span>
                </div>
                <div className="content-bottom">
                  <ul>
                    <li>
                      <span>Only 66 available for pre-sale.</span>
                    </li>
                    <li>
                      <span>Available exclusively on our website until March 4, 2022.</span>
                    </li>
                    <li>
                      <span>
                        Every Memory Mint entitles its holder to their own Memory Vault (coming
                        soon).
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="content-amount">
                  {canMint ? (
                    <input
                      type="number"
                      className="nft-amount"
                      onChange={(e) => setKissAmount(e.target.value)}
                    />
                  ) : (
                    <input type="number" className="nft-amount" disabled />
                  )}
                </div>
                <div className="content-btn">
                  <a
                    className="btn btn-custom"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMint(2);
                    }}>
                    {account ? 'MINT' : 'CONNECT WALLET'}
                  </a>
                </div>
              </div>
              <div className="right-table">
                <div className="header">
                  <p className="title">"MONKEY KISS"</p>
                  <p className="paragraph">General Sale Begin TBD</p>
                </div>
                <div className="content-top">
                  <span>ETH</span>
                  <span>.08</span>
                  <span>/266</span>
                </div>
                <div className="content-bottom">
                  <ul>
                    <li>
                      <span>266 available for general sale across all platforms.</span>
                    </li>
                    <li>
                      <span>34 to be held in reserve.</span>
                    </li>
                    <li>
                      <span>
                        Every Memory Mint entitles its holder to their own Memory Vault (coming
                        soon).
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="pricing-view">
              <img alt="" src={MONKEYKISS1} onClick={() => handleSelectImg(MONKEYKISS1)} />
              <img alt="" src={MONKEYKISS2} onClick={() => handleSelectImg(MONKEYKISS2)} />
              <img alt="" src={MONKEYKISS3} onClick={() => handleSelectImg(MONKEYKISS3)} />
              <img alt="" src={MONKEYKISS4} onClick={() => handleSelectImg(MONKEYKISS4)} />
              <img alt="" src={MONKEYKISS5} onClick={() => handleSelectImg(MONKEYKISS5)} />
              <div className="click-view" onClick={() => handleShowFullscreen3dModel('kiss')}>
                Launch Model
              </div>
            </div>
          </div>
          <div className="service" id="serviceEyes">
            <div className="pricing-table">
              <div className="left-table">
                <div className="header">
                  <p className="title">"THOSE EYES"</p>
                  <p className="paragraph">Pre-sale Now Available</p>
                </div>
                <div className="content-top">
                  <span>ETH</span>
                  <span>.07</span>
                  <span>/66</span>
                </div>
                <div className="content-bottom">
                  <ul>
                    <li>
                      <span>Only 66 available for pre-sale.</span>
                    </li>
                    <li>
                      <span>Available exclusively on our website until March 4, 2022.</span>
                    </li>
                    <li>
                      <span>
                        Every Memory Mint entitles its holder to their own Memory Vault (coming
                        soon).
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="content-amount">
                  {canMint ? (
                    <input
                      type="number"
                      className="nft-amount"
                      onChange={(e) => setEyesAmount(e.target.value)}
                    />
                  ) : (
                    <input type="number" className="nft-amount" disabled />
                  )}
                </div>
                <div className="content-btn">
                  <a
                    className="btn btn-custom"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMint(3);
                    }}>
                    {account ? 'MINT' : 'CONNECT WALLET'}
                  </a>
                </div>
              </div>
              <div className="right-table">
                <div className="header">
                  <p className="title">"THOSE EYES"</p>
                  <p className="paragraph">General Sale Begin TBD</p>
                </div>
                <div className="content-top">
                  <span>ETH</span>
                  <span>.08</span>
                  <span>/266</span>
                </div>
                <div className="content-bottom">
                  <ul>
                    <li>
                      <span>266 available for general sale across all platforms.</span>
                    </li>
                    <li>
                      <span>34 to be held in reserve.</span>
                    </li>
                    <li>
                      <span>
                        Every Memory Mint entitles its holder to their own Memory Vault (coming
                        soon).
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="pricing-view">
              <img alt="" src={THOSEEYES1} onClick={() => handleSelectImg(THOSEEYES1)} />
              <img alt="" src={THOSEEYES2} onClick={() => handleSelectImg(THOSEEYES2)} />
              <img alt="" src={THOSEEYES3} onClick={() => handleSelectImg(THOSEEYES3)} />
              <img alt="" src={THOSEEYES4} onClick={() => handleSelectImg(THOSEEYES4)} />
              <img alt="" src={THOSEEYES5} onClick={() => handleSelectImg(THOSEEYES5)} />
              <div className="click-view" onClick={() => handleShowFullscreen3dModel('eyes')}>
                Launch Model
              </div>
            </div>
          </div>
        </div>
        <div className="content5">
          <div className="series">
            <span>SERIES REWARD:</span>
            <span>Complete an entire series and receive the following:</span>
            <ul>
              <li>Special SERIES NFT awarded only to holders of complete series.</li>
              <li>Access to Sommer's Personal Memory Vault</li>
              <li>Invitation to regular meet and greets with Sommer in her Memory Vault</li>
            </ul>
          </div>
          <div className="collection">
            <span>COLLECTION REWARD:</span>
            <span>Complete an entire colection and receive all of the above PLUS:</span>
            <ul>
              <li>Special COLLECTION NFT awarded only to holders of the complete collection.</li>
              <li>One-on-one chat sessions with Sommer</li>
            </ul>
          </div>
          <div className="roadmap">
            <span>ROADMAP FOR FUTURE RELEASE:</span>
            <ul>
              <li>
                SERIES B, featuring memories from Sommer's visit to Machu Picchu drops MARCH 11,
                2022.
              </li>
              <li>
                Special, ultra-rare, one-of-one NFT "Becoming the Brand" announcement on MARCH 11,
                2022.
              </li>
              <li>
                SERIES C, featuring memories from Sommer's 2019 trip to Tokyo drops MARCH 18, 2022.
              </li>
              <li>
                Future series TBA, featuring memories from Sommer's home in Bondi Beach, Australia.
              </li>
              <li>
                Special, limited edition drop of Sommer's work-out routine, featuring special guests
                and celebrity trainers, launching in Q2, 2022.
              </li>
            </ul>
          </div>
        </div>
        <div className="avatar"></div>
      </div>
      {isShowFullscreenImg && (
        <FullscreenImg img={selectedImg} closeFullScreen={() => setShowFullscreenImg(false)} />
      )}
      {isShowFullscreen3d && (
        <Fullscreen3d component={selected3d} closeFullScreen={() => setShowFullscreen3d(false)} />
      )}
      {isMinting && <Loader content="Mint in progress..." />}
    </div>
  );
};
