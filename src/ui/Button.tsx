import styled, { css } from 'styled-components';

const sizes = {
  xxs: css`
    width: 2ch;
    height: 2ch;
    aspect-ratio: 1/1;
    font-size: 1rem;
    padding: 0rem;
    font-weight: 600;
    /* min-width: 4rem; */
  `,
  xs: css`
    font-size: 1rem;
    padding: 0.2rem 0.4rem;
    font-weight: 600;
    min-width: 4rem;
  `,
  small: css`
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
    font-weight: 600;
    min-width: 8rem;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 0.8rem 2rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.8rem;
    padding: 1rem 2rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    background-color: rgba(var(--clr-accent-5), 0.5);
    color: rgba(var(--clr-text-2));
  `,
  secondary: css`
    background-color: rgba(var(--clr-accent-3));

    &:hover {
      background-color: rgba(var(--clr-accent-4));
    }
  `,
  warning: css`
    background-color: #ed5650;

    &:hover {
      background-color: rgba(var(--clr-accent-4));
    }
  `,
  round: css`
    border-radius: 50%;
  `,
};

type ButtonProps = {
  $size?: keyof typeof sizes;
  $variation?: keyof typeof variations;
};

const Button = styled.button<ButtonProps>`
  text-align: center;
  border: none;
  border-radius: 0.5em;
  /* color: var(--clr-text-1); */
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover
  /* &:focus  */
  {
    background-color: rgba(var(--clr-accent-5), 0.8);
  }

  &:active {
    transform: scale(0.975);
    filter: brightness(90%);
  }

  &:disabled {
    background-color: darkred;
  }

  ${({ $size }) => ($size ? sizes[$size] : Button.defaultProps.$size)};
  ${({ $variation }) =>
    $variation ? variations[$variation] : Button.defaultProps.$variation};
`;

Button.defaultProps = {
  $variation: 'primary',
  $size: 'medium',
};

export default Button;
