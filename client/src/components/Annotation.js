export function Annotation({ annotation }) {
    const deleteAnnotation = (annotation) => {
      fetch(`/images/${annotation.image_id}/annotations/${annotation.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((serverResponse) => window.location.reload());
    };
  
    return (
      <li className="annotation">
        <div>
        <VisualAnnotation visualAnnotation={annotation.visual} />
        <WrittenAnnotation writtenAnnotation={annotation.written}/>
        <button onClick={() => deleteAnnotation(annotation)}>
          Delete Annotation
        </button>
        </div>
        
      </li>
    );
  }

// <img src=
// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAJWklEQVR4Xu3aMY4CQRRDQbg5RyclHaRB/XCRL7jLX472+fAhQIBAROAZySkmAQIEHgbLERAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgJXBuuVeVU7KOd2f9LfKGCwbsT98qsN1pdw/uz/Ba4M1v9reCEBAkcLGKyj6xGOAIFPAYPlHggQyAgYrExVghIgYLDcAAECGQGDlalKUAIEDJYbIEAgI2CwMlUJSoDAlcHyD42/uRfOv3H2K0EBg3VeaQbrvE4kOkTgymAdElkMAgRWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXAYK02790EggIGK1iayARWBQzWavPeTSAoYLCCpYlMYFXgDZ8CBS3+LTpAAAAAAElFTkSuQmCC"
// I hardcoded the canvas.toDataURL
// however, I don't know where this is being served from?
// if it's from a local machine, how would that work with different machines
// data from one machine isn't available to another machine
// or is it image information that the computer understands? 
// like code that can be translate into an image?
// sort of like how binary code can be translate into letters
// can those string of letters be translate into an image?
// so I tried the string on another browser and it showed the image
// if it is a file in a storage, I don't see how firefox will have access to chrome storage
// I guess the string is a description of a png image
// next question is whether the image is transparent
// alt="canvas state">
// </img>
// this is the hardcoded image for visual annotation

function VisualAnnotation({visualAnnotation}){
  return(
    <div>
      <img src={visualAnnotation} alt="visual annotation">
      </img>
    </div>
  )
}

function WrittenAnnotation({writtenAnnotation}){
  return(
    <p>{writtenAnnotation}</p>
  )
}