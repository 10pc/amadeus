import React, { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import styles from "../style/loading.module.scss";
import "../style/scanlines.scss";
import bgNoises from '../assets/boot_bg_noises.mp3';
import bootSound from '../assets/boot_logo.mp3';
import bgImage from '../assets/bg.jpg';

import frame01 from '../assets/boot_animation/01.png';
import frame02 from '../assets/boot_animation/02.png';
import frame03 from '../assets/boot_animation/03.png';
import frame04 from '../assets/boot_animation/04.png';
import frame05 from '../assets/boot_animation/05.png';
import frame06 from '../assets/boot_animation/06.png';
import frame07 from '../assets/boot_animation/07.png';
import frame08 from '../assets/boot_animation/08.png';
import frame09 from '../assets/boot_animation/09.png';
import frame10 from '../assets/boot_animation/10.png';
import frame11 from '../assets/boot_animation/11.png';
import frame12 from '../assets/boot_animation/12.png';
import frame13 from '../assets/boot_animation/13.png';
import frame14 from '../assets/boot_animation/14.png';
import frame15 from '../assets/boot_animation/15.png';
import frame16 from '../assets/boot_animation/16.png';
import frame17 from '../assets/boot_animation/17.png';
import frame18 from '../assets/boot_animation/18.png';
import frame19 from '../assets/boot_animation/19.png';
import frame20 from '../assets/boot_animation/20.png';
import frame21 from '../assets/boot_animation/21.png';
import frame22 from '../assets/boot_animation/22.png';
import frame23 from '../assets/boot_animation/23.png';
import frame24 from '../assets/boot_animation/24.png';
import frame25 from '../assets/boot_animation/25.png';
import frame26 from '../assets/boot_animation/26.png';
import frame27 from '../assets/boot_animation/27.png';
import frame28 from '../assets/boot_animation/28.png';
import frame29 from '../assets/boot_animation/29.png';
import frame30 from '../assets/boot_animation/30.png';
import frame31 from '../assets/boot_animation/31.png';
import frame32 from '../assets/boot_animation/32.png';
import frame33 from '../assets/boot_animation/33.png';
import frame34 from '../assets/boot_animation/34.png';
import frame35 from '../assets/boot_animation/35.png';
import frame36 from '../assets/boot_animation/36.png';
import frame37 from '../assets/boot_animation/37.png';
import frame38 from '../assets/boot_animation/38.png';

function LoadingScreen() {
  const [outputText, setOutputText] = useState([]);
  const [isTextDisplayed, setIsTextDisplayed] = useState(true);
  const [isGridDisplayed, setIsGridDisplayed] = useState(false);
  const [isLogoDisplayed, setIsLogoDisplayed] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  const bootAnimationFrames = [
    frame01, frame02, frame03, frame04, frame05,
    frame06, frame07, frame08, frame09, frame10,
    frame11, frame12, frame13, frame14, frame15,
    frame16, frame17, frame18, frame19, frame20,
    frame21, frame22, frame23, frame24, frame25,
    frame26, frame27, frame28, frame29, frame30,
    frame31, frame32, frame33, frame34, frame35,
    frame36, frame37, frame38
  ];

  const updateBootAnimationFrame = () => {
    setCurrentFrameIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= bootAnimationFrames.length) {
        return 0;
      }
      return nextIndex;
    });
  };

  const textToDisplay = `Amadeus system ver.1.09.2 rev.2123
  ‏‏‎ ‎
>>Initialize System ... ok
>>Detecting boot device ... ok
>>Loading kerner ...ok
>>Detecting OS control device ... ok
>>Booting...
>>Processor 0 is Active ... ok
>>Processor 1 is Active ... OK
>>Processor 2 is Active ... ok
>>Processor 3 is Active ... ok
>>Memory Initialize 0/32767MBytes`;

  const textToDisplayAfterMemory = `‏‏‎ ‎
Init: Kernel version 2.04 booting...
‏‏‎ ‎
ROSS:
‏‏‎ ‎
Mounting proc at /proc ...				[ok]
Mounting sysfs at /sts ...				[ok]
Initakising network
Setting up localhost ...				[ok]
Setting up inet1 ...					[ok]
Setting up route ...					[ok]
Accessing Croud ...					[ok]
Starting system log at /log/sys...			[ok]
Cleaning /var/lock					[ok]
Cleaning /tmp						[ok]
Updating init.rc					[ok]`;

  const totalMemory = 32767;

  useEffect(() => {
    const bgNoisesAudio = new Audio(bgNoises);
    const bootSoundAudio = new Audio(bootSound);
  
    (async function () {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const uniqueOutputText = [];
  
      // Play background noise on a loop
      bgNoisesAudio.loop = true;
      bgNoisesAudio.play();
  
      // Display initial text
      const linesToDisplay = textToDisplay.split("\n");
      for (let i = 0; i < linesToDisplay.length; i++) {
        const line = linesToDisplay[i];
        for (let j = 0; j <= line.length; j++) {
          await delay(10);
          uniqueOutputText[i] = line.substring(0, j);
          unstable_batchedUpdates(() => {
            setOutputText([...uniqueOutputText]);
          });
        }
        await delay(200);
      }
  
      // Display memory initialization progress
      let memoryLineIndex = uniqueOutputText.length - 1;
      let memoryLoaded = 0; // initialize memory loaded to 0
      const memoryStep = Math.floor(totalMemory / 10);
      const memorySteps = 10;
      for (let i = 0; i <= memorySteps; i++) {
        const memoryLine = `>>Memory Initialize ${memoryLoaded}/${totalMemory}MBytes`;
        await delay(50);
        uniqueOutputText[memoryLineIndex] = memoryLine;
        unstable_batchedUpdates(() => {
          setOutputText([...uniqueOutputText]);
        });
        memoryLoaded += memoryStep; // update memory loaded
      }
      const finalMemoryLine = `>>Memory Initialize ${totalMemory}/${totalMemory}MBytes`;
      await delay(50);
      uniqueOutputText[memoryLineIndex] = finalMemoryLine;
      unstable_batchedUpdates(() => {
        setOutputText([...uniqueOutputText]);
      });
  
      // Display text after memory initialization
      const linesToDisplayAfterMemory = textToDisplayAfterMemory.split("\n");
      for (let i = 0; i < linesToDisplayAfterMemory.length; i++) {
        const line = linesToDisplayAfterMemory[i];
        for (let j = 0; j <= line.length; j++) {
          await delay(10);
          uniqueOutputText[i + linesToDisplay.length] = line.substring(0, j);
          unstable_batchedUpdates(() => {
            setOutputText([...uniqueOutputText]);
          });
        }
        await delay(200);
      }
  
      // Hide text and show grid after a delay of 4 seconds and 7 seconds respectively
      setTimeout(() => {
        setIsTextDisplayed(false);
        setIsGridDisplayed(true);
      }, 4000);
      setTimeout(() => {
        setIsGridDisplayed(false);
        setIsLogoDisplayed(true);
        // Stop background noise and play boot logo sound when the boot logo appears
        bgNoisesAudio.pause();
        bootSoundAudio.play();
  
        const bootAnimationInterval = setInterval(updateBootAnimationFrame, 3700 / (bootAnimationFrames.length - 1));
  
        setTimeout(() => {
          setIsLogoDisplayed(false);
          clearInterval(bootAnimationInterval); // Clear the interval when the animation ends
        }, 2000);
      }, 7000);
    })();
  
    // Cleanup event listeners when the component is unmounted
    return () => {
      bgNoisesAudio.pause();
      bootSoundAudio.pause();
    };
  }, []);

  return (
    <div className="scanlines">
      <div className={styles.amadeusbg2} style={{ backgroundImage: `url(${bgImage})` }}>
      <div className={styles.wrapper}>
        <audio id="bg-noises" src={bgNoises} loop />
        <audio id="boot-sound" src={bootSound} />

        {/* Conditionally render the text and input */}
        {isTextDisplayed && (
          <pre>
            <output id="output">
              {outputText.map((text, index) => (
                <React.Fragment key={index}>
                  {index === outputText.length - 1 ? (
                    <span>{text}</span>
                  ) : (
                    <div>{text}</div>
                  )}
                </React.Fragment>
              ))}
            </output>
            <div className="user-input">
              <span className="incentive">$</span>
              <input type="text" className={`${styles.inputText} invisible`} />
            </div>
          </pre>
        )}

        {/* Conditionally render the grid */}
        <div className={`${styles.grid} ${isGridDisplayed ? styles["grid-show"] : ""}`}></div>



        {/* Conditionally render the boot logo */}
        {isLogoDisplayed && (
          <div className={`${styles["boot-logo"]}${isLogoDisplayed ? ` ${styles.show}` : ''}`}>
            <img src={bootAnimationFrames[currentFrameIndex]} alt="boot logo" />
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default LoadingScreen;