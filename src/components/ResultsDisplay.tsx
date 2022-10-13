import React, {
  useMemo,
  useState,
}                          from 'react';
import { Result }          from '../lib/types';
import { getData }         from '../lib/results';
import StepDisplay         from './StepDisplay';
import { PlayTimeDisplay } from './displays/index';

interface ResultsDisplayProps {
  results: Array<Result>;
  codes: Array<string>;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  codes,
}) => {
  const [ main_progress, setMainProgress ] = useState<number>(0);
  const step = Math.floor(main_progress / 100);

  const data_to_display = useMemo(
    () => getData(results, codes)
  , [results, codes]);

  if (!data_to_display) return (
    <div>ERROR</div> //TODO
  );
  return (<div className="flex flex-grow relative" style={{
    width: '100%',
    height: '100%',
  }}>
    <StepDisplay setMainProgress={setMainProgress}/>
    {
      (step === 0 && <PlayTimeDisplay data={data_to_display} main_progress={main_progress}/>) ||
      (step === 1 && <PlayTimeDisplay data={data_to_display} main_progress={main_progress}/>) ||
      (step === 2 && <PlayTimeDisplay data={data_to_display} main_progress={main_progress}/>) ||
      (step === 3 && <PlayTimeDisplay data={data_to_display} main_progress={main_progress}/>) ||
      (<div>Done</div>)
    }
  </div>);
};
export default ResultsDisplay;