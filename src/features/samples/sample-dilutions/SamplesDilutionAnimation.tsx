import { CultureContainer, DiluentContainer, SampleContainer } from './dilutions-styles';


export default function SamplesDilutionAnimation({
  diluentUL,
  sampleUL,
  dilutionFactor,
}) {
  const diluentHeight = diluentUL / (diluentUL + sampleUL);
  const cultureHeight = sampleUL / (diluentUL + sampleUL);
  console.log('mediaHeight', diluentHeight, cultureHeight);
  return (
    // <Container id="animation-container">
    <SampleContainer>
        <CultureContainer
          style={{ height: `${(cultureHeight + diluentHeight) * 80}%` }}
        ></CultureContainer>
      <DiluentContainer
        style={{ height: `${diluentHeight * 80}%` }}
      ></DiluentContainer>
    </SampleContainer>
    // </Container>
  );
}
