export const useGlobals = () => {
  const [fileName, setFileName] = useState(fileNames[0]);

  const result = useJSON({ url: `data/fall.json` });

  console.log(result);
};
