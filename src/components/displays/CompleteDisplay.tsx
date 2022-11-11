import { CleanData } from '../../lib/types';
import CornerIcon    from './CornerIcon';

interface CompleteDisplayProps {
  data: CleanData;
};

const SummaryTitle = () => (
  <div
    className="flex flex-grow items-center justify-center"
    style={{ fontSize: '1.7em' }}
  >
    YOUR 2022 MELEE WRAP
  </div>
);

const PlayTimeLine: React.FC<CompleteDisplayProps> = ({ data }) => {
  const { games, playtime, winrate } = data;

  return (<div className="flex flex-grow flex-col relative justify-center">
    <span>
      You played a total of
      <span style={{color: "var(--accent-yellow)"}}><b> {games} </b></span>
      games, for a whopping
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(playtime/60/60/60)} </b></span>
      hours of Melee!
      <br/>
    </span>
    <span>
      Your global winrate was
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(winrate * 1000)/10}%.</b></span>
      <br/>
    </span>
  </div>);
};

const CharLine: React.FC<CompleteDisplayProps> = ({ data }) => {
  const main_game_count = data.my_chars[0].games;
  const main_game_winrate = data.my_chars[0].winrate;
  const main_char = data.my_chars[0].name;

  return (<div className="flex flex-grow flex-col relative justify-center">
    <span>
      Your most played character was
      <span style={{color: "var(--accent-yellow)"}}><b> {main_char},</b></span><br/>
      with whom you played
      <span style={{color: "var(--accent-yellow)"}}><b> {main_game_count} </b></span>
      games and had 
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(main_game_winrate * 1000)/10}% </b></span>
      winrate.
    </span>
  </div>);
};

const NemesisLine: React.FC<CompleteDisplayProps> = ({ data }) => {
  const { games, winrate, names } = data.nemesis[0];
  const nemesis_name = Object.keys(names)[0];
  console.log(data);
  return (<div className="flex flex-grow flex-col relative justify-center">
    <span>
      Your nemesis was
      <span style={{color: "var(--accent-yellow)"}}><b> {nemesis_name},</b></span><br/>
      playing
      <span style={{color: "var(--accent-yellow)"}}><b> {games} </b></span>
      matches with them for a
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(winrate * 1000)/10}% </b></span>
      winrate.
    </span>
  </div>);
};

export const CompleteDisplay: React.FC<CompleteDisplayProps> = ({ data }) => {
  return (<div
    className="flex flex-col items-center justify-center w-full h-full"
    style={{fontSize: '1.3em', marginBottom: '3em'}}
  >
    <SummaryTitle />
    <PlayTimeLine data={data} />
    <CharLine data={data} />
    <NemesisLine data={data} />
    <CornerIcon char_name={data.my_chars[0].name}/>
  </div>);
};