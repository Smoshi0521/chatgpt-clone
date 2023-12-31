
type Props = {
  close: () => void
}

const CloseSideBar = ({close}:Props ) => {
  return (
    <div onClick={close} className='closeSide border border-gray-700 py-4 bg-[#343541]'>
      <svg className="w-6 text-white" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
    </div>
  );
}

export default CloseSideBar;