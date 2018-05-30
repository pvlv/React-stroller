import * as React from 'react';
import styled from 'styled-components';
import {AppWrapper} from './styled';

import {Stroller} from "../src/Stroller";
import {Strollable} from "../src";
import {StrollCaptor} from "../src/StrollCaptor";
import {StrollableContainer} from "../src/StrollableContainer";
import {IStrollerBarProps} from "../src/Bar";

export interface AppState {

}

const Block = styled.div`
  height: 200px;  
  width: 800px;
  background-color:#f0f0f0;
  position: relative;
`;

const LongLi = styled.div`
  display: flex;
  flex-direction:row;
  ul {
    display:flex;
  }
  li {
    padding:5px;
  }
`;

const UL = () => (
  <ul>
    {(Array(50) as any)
      .fill(1)
      .map((_: any, index: number) => <li key={`k${index}`}>{index}</li>)
    }
  </ul>
)

const Bar = styled.div`
  width:8px;
  height:8px;
  border-radius:8px;
  align-self: center;
  background-color: #F00;
  
  transition-property: transform;
  transition-duration: 300ms;
  
  transform-origin: 100% 50%;
  
  &:hover {
    transform: scale(1.5);  
  }
  
  ${(props: any) => props.dragging && `
    && {transform: scale(2);}   
  `}
`;

const positions = {
  vertical: {
    0: {
      top: 0,
      right: 0,
    },
    1: {
      top: 0,
      left: 0,
    }
  },

  horizontal: {
    0: {
      bottom: 0,
      left: 0,
    },
    1: {
      top: 0,
      left: 0,
    },
  }
};

const NuanCarBar: React.SFC<IStrollerBarProps> = ({
                                                    mainScroll,
                                                    targetScroll,
                                                    forwardRef,
                                                    location,
                                                    dragging,
                                                    draggable,
                                                    oppositePosition,

                                                    axis,
                                                    targetAxis
                                                  }) => {
  const factor = mainScroll.scroll / (mainScroll.scrollSpace - mainScroll.space);
  const length =
    location === 'inside'
      ? (targetScroll.scrollSpace) * factor
      : (targetScroll.space- (targetAxis === 'horizontal' ? 26 : 0)) * factor;

  const W = targetAxis === 'horizontal' ? 'width' : 'height';
  const H = targetAxis !== 'horizontal' ? 'width' : 'height';
  return (
    <div
      style={{
        position: location === 'fixed' ? 'fixed' : 'absolute',
        cursor: dragging ? 'grabbing' : (draggable ? 'grab' : 'default'),

        ...(positions[targetAxis][oppositePosition ? 1 : 0] as any),
        [W]: Math.round(length) + 'px',
        [H]: '16px',
        willChange: 'width,height',
        overflow: 'hidden'
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        backgroundImage:
        'linear-gradient(' + (targetAxis === 'horizontal' ? 0 : -90) + 'deg, transparent, magenta, red, yellow, limegreen, turquoise, blue, magenta, transparent)',
        backgroundPosition: targetAxis === 'horizontal' ? '-16px center' : 'center -16px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}/>
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        [W]: '26px',
        [H]: '16px',
      }}>

        <div
          ref={forwardRef as any}
          style={{
            width: '26px',
            height: '16px',
            backgroundImage: 'url("cat.gif")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            ...(targetAxis !== 'horizontal' ? {
            transform:'rotate(90deg)',
            transformOrigin:'8px 8px',
          } : {})
          }}/>
      </div>
    </div>
  );
}

const NyanBarFixed = () => (
  <Stroller draggable axis="vertical" targetAxis="horizontal" overrideLocation="fixed" scrollBar={NuanCarBar}/>
)

export default class App extends React.Component <{}, AppState> {
  state: AppState = {}

  render() {
    return (
      <AppWrapper>
        <Strollable axis="vertical">
          <NyanBarFixed/>

          Simple
          <Block>
            <Strollable axis="vertical">
              <UL/>
              <div>
                {/*<UL/>*/}
                <Stroller axis="vertical"/>
              </div>
            </Strollable>
          </Block>
          <hr/>
          {1 && <div>
            Outer
            <Block>
              <Stroller axis="vertical" draggable>
                <Block>
                  <Strollable axis="vertical">
                    <UL/>
                    <div>
                      {/*<UL/>*/}
                      <StrollCaptor/>
                    </div>
                  </Strollable>
                </Block>
              </Stroller>
            </Block>
            <hr/>
            Container
            <Block>
              <StrollableContainer axis="vertical" draggable>
                <UL/>
              </StrollableContainer>
            </Block>
            <hr/>
            Nyan Container
            <Block>
              <StrollableContainer axis="vertical" oppositePosition={false} draggable scrollBar={NuanCarBar}>
                <UL/>
              </StrollableContainer>
            </Block>
            <hr/>

            Draggable
            <Block>
              <Strollable axis="vertical">
                <UL/>
                <div>
                  {/*<UL/>*/}
                  <Stroller axis="vertical" oppositePosition draggable/>
                </div>
              </Strollable>
            </Block>
            <hr/>
            Custom Bar
            <Block>
              <Strollable axis="vertical">
                <UL/>
                <div>
                  {/*<UL/>*/}
                  <Stroller
                    axis="vertical"
                    bar={Bar}
                    barSizeFunction={(_1, _2, {dragging}) => dragging ? 16 : 8}
                    draggable
                  />
                </div>
              </Strollable>
            </Block>
            <hr/>
            In hidden block
            <Block>
              <div style={{position: 'relative', overflow: 'hidden', height: '200px'}}>
                <UL/>
                <div>
                  {/*<UL/>*/}
                  <Stroller axis="vertical" draggable/>
                </div>
              </div>
            </Block>
            <hr/>
            Horizontal
            <Block>
              <StrollableContainer axis="horizontal" draggable oppositePosition>
                <LongLi>
                  <UL/>
                  <UL/>
                  <UL/>
                </LongLi>
              </StrollableContainer>
            </Block>
            <hr/>
          </div>
          }
        </Strollable>
      </AppWrapper>
    )
  }
}