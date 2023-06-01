import styled from "styled-components";
import { useState, useEffect } from "react";

function StarRate() {
    const AVR_RATE = 88; // 상품 평균 평점. 실제로는 데이터에서 패치할 것 입니다.
    const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last']; // 다섯개의 별을 따로 컨트롤하기 위해서는 고유 id를 각각 가지고 있어야 합니다. 이 고유 아이디를 쉽게 생성해 주기 위한 리스트 입니다.
    const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);    // 별점 리스트 상태입니다.
    const calcStarRates = () => {
        let tempStarRatesArr = [0, 0, 0, 0, 0]; // 임시 리스트.
        let starVerScore = (AVR_RATE * 70) / 100;   // 별 한 개 당 width가 14이므로 총 70. 100점 만점인 현재와 비율을 맞춰줍니다.
        let idx = 0;
        while (starVerScore > 14) { // 14를 starVerScore에서 하나씩 빼가면서 별 하나하나에 채워질 width를 지정해줍니다. 다 채워지지 않을 인덱스의 별은 아래 tempStarRatesArr[idx] = starVerScore; 에서 채워줍니다.
          tempStarRatesArr[idx] = 14;
          idx += 1; // 인덱스 0부터 첫번째 별 입니다.
          starVerScore -= 14;
        }
        tempStarRatesArr[idx] = starVerScore;
        return tempStarRatesArr;    // 평균이 80이라면 [14, 14, 14, 14, 0] 이 되겠죠?
      };
    useEffect(() => {
        setRatesResArr(calcStarRates)   // 별점 리스트는 첫 렌더링 때 한번만 상태를 설정해줍니다.
    }, [])
    const icons = Array(5).fill(null);
    return (
        
        <StarRateWrap>
            

            {STAR_IDX_ARR.map((item, idx) => {
                return <span className='star_icon' key={`${item}_${idx}`}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='#808080' >
                        
			{/* id는 별 하나하나 마다 다른 값을 가지고 있어야 합니다 */}
                        <clipPath id={`${item}StarClip`}>
                            {/* 새로 생성한 리스트에서 별 길이를 넣어줍니다. */}
                            <rect width={`${ratesResArr[idx]}`} height='18' />
                        </clipPath>
                        <path
                            id={`${item}Star`}
                            d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
                            transform='translate(-2 -2)'
                        />
                        <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='#000000'
                        />
                    </svg>
                </span>
                
            
            })
            }

            

           
        </StarRateWrap>
    )
}

export default StarRate;

const StarRateWrap = styled.div`
        display: flex;
        align-items: center;
        width: 100%;
        margin: 100px 0 0 15px;
        .star_icon {
          display: inline-flex;
          margin-right: 5px;
        `;
      
