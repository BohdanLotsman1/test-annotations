type Props = {
  className?: string;
  fill?: string;
};

const SendIcon = ({ className, fill = '#758CA3' }: Props) => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 -0.5 21 21"
      id="meteor-icon-kit__solid-paper-plane"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.61258 9L0.05132 1.31623C-0.22718 0.48074 0.63218 -0.28074 1.42809 0.09626L20.4281 9.0963C21.1906 9.4575 21.1906 10.5425 20.4281 10.9037L1.42809 19.9037C0.63218 20.2807 -0.22718 19.5193 0.05132 18.6838L2.61258 11H8.9873C9.5396 11 9.9873 10.5523 9.9873 10C9.9873 9.4477 9.5396 9 8.9873 9H2.61258z"
        fill={fill}
      />
    </svg>
  );
};

export default SendIcon;
