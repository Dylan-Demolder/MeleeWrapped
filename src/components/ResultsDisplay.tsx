import React, {
  useState,
  useEffect,
}                    from 'react';
import { CleanData } from '../lib/types';
import {
  sendToGcp,
}                    from '../lib/utils';
import StepDisplay   from './StepDisplay';
import {
  PlayTimeDisplay,
  DetailsDisplay,
  CharsDisplay,
  MusDisplay,
  StagesDisplay,
  NemesisDisplay,
  CompleteDisplay,
}                    from './displays/index';
import sadcat        from '../images/sad.jpg';

interface ResultsDisplayProps {
  data: CleanData,
  codes: Array<string>;
  setDone: (done: boolean) => void;
  name: string;
  already_sent: boolean;
}

const NUMBER_STEPS = 6;

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  data,
  codes,
  setDone,
  name,
  already_sent,
}) => {
  const [ main_progress, setMainProgress ] = useState<number>(0);
  const step = Math.floor(main_progress / 100);

  // Mark ending & send to GCP
  useEffect(() => {
    if (main_progress === 100*NUMBER_STEPS) {
      setDone(true);
      if (!already_sent) {
        sendToGcp(data, codes, name);
      }
    }
  }, [main_progress, setDone, data, codes, name, already_sent]);

  // If no data, display error
  if (!data) return (
    <div style={{textAlign: 'center'}}>
      There was an error processing your data :(<br/>
      <img src={sadcat} alt="sad cat" style={{width: '10em', margin: '1em auto'}}/>
      Could you send your replays to carlos@marah.dev?
    </div>
  );

  return (<div
    className="flex flex-grow relative"
    style={{ width: '100%', height: '100%' }}
  >
    {step < NUMBER_STEPS && (<StepDisplay setMainProgress={setMainProgress}/>)}
    <div
      className="flex flex-col flex-grow"
      style={{ width: '100%', height: '100%', backgroundColor: '#433365' }}
    >
      {
        (step === 0 && <PlayTimeDisplay data={data} main_progress={main_progress}/>) ||
        (step === 1 && <DetailsDisplay data={data} main_progress={main_progress}/>) ||
        (step === 2 && <CharsDisplay data={data} main_progress={main_progress}/>) ||
        (step === 3 && <MusDisplay data={data} main_progress={main_progress}/>) ||
        (step === 4 && <StagesDisplay data={data} main_progress={main_progress}/>) ||
        (step === 5 && <NemesisDisplay data={data} main_progress={main_progress}/>) ||
                      (<CompleteDisplay data={data}/>)
      }
    </div>
  </div>);
};
export default ResultsDisplay;
