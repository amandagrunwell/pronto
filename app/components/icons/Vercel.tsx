import { FC } from "react";

interface VercelProps {}

const Vercel: FC<VercelProps> = ({}) => {
  return (
    <div>
      <svg
        width="100"
        height="100"
        viewBox="0 0 128 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.334 0.987999L16.906 1.731L0 31.01H34.67L17.334 0.987999ZM17.336 2.967L32.957 30.023H1.713L17.336 2.967ZM33.526 3.713L46.744 26.602L59.959 3.712H54.178L46.74 16.599L39.303 3.714L33.526 3.713ZM122.998 3.713V25.215H128V3.713H127.506H122.998ZM35.238 4.701H38.73L46.74 18.574L54.75 4.701H58.246L46.744 24.623L35.238 4.701ZM123.986 4.701H127.01V24.227H123.986V4.701ZM64.324 8.617C61.755 8.617 59.506 9.46 57.902 10.959C56.299 12.458 55.355 14.609 55.355 17.139C55.355 22.229 59.627 25.66 64.77 25.66C67.874 25.66 70.645 24.43 72.373 22.318L72.74 21.868L68.48 19.406L68.213 19.699C67.416 20.571 66.185 21.099 64.77 21.099C63.154 21.099 61.93 20.306 61.164 19.189H73.05L73.128 18.791C73.2362 18.2456 73.2912 17.691 73.292 17.135C73.292 14.607 72.35 12.455 70.747 10.957C69.144 9.459 66.896 8.617 64.324 8.617ZM95.184 8.617C92.614 8.617 90.367 9.46 88.764 10.959C87.16 12.458 86.214 14.609 86.214 17.139C86.214 19.669 87.159 21.821 88.762 23.32C90.365 24.82 92.612 25.66 95.184 25.66C98.6 25.66 101.444 24.157 102.957 21.635L103.215 21.203L98.908 18.719L98.668 19.176C98.042 20.376 96.871 21.103 95.184 21.103C93.937 21.103 92.963 20.703 92.287 20.023C91.612 19.344 91.219 18.369 91.219 17.139C91.219 15.909 91.613 14.935 92.289 14.256C92.965 13.576 93.939 13.174 95.184 13.174C96.871 13.174 98.042 13.901 98.668 15.102L98.908 15.561L103.217 13.074L102.957 12.643C101.44 10.121 98.6 8.617 95.184 8.617ZM112.344 8.617C109.774 8.617 107.526 9.46 105.922 10.959C104.318 12.458 103.375 14.609 103.375 17.139C103.375 22.229 107.651 25.66 112.789 25.66C115.894 25.66 118.665 24.43 120.393 22.318L120.76 21.868L116.5 19.406L116.233 19.699C115.436 20.571 114.204 21.099 112.789 21.099C111.174 21.099 109.95 20.306 109.184 19.189H121.067L121.147 18.791C121.255 18.2456 121.31 17.691 121.311 17.135C121.311 14.607 120.369 12.455 118.766 10.957C117.163 9.459 114.916 8.617 112.344 8.617ZM74.979 9.062V25.215H79.98V18.12C79.98 15.675 81.581 14.155 83.945 14.155C84.395 14.155 84.82 14.235 85.235 14.355L85.867 14.536V9.062H85.373C83.654 9.062 82.09 9.542 80.928 10.352C80.536 10.626 80.269 10.992 79.98 11.339V9.061L74.979 9.062ZM64.324 9.608C66.681 9.608 68.669 10.37 70.07 11.68C71.472 12.99 72.303 14.85 72.303 17.135C72.303 17.505 72.247 17.852 72.195 18.201H59.43L59.682 18.871C60.435 20.866 62.462 22.09 64.769 22.09C66.1833 22.0963 67.5477 21.568 68.589 20.611L71.107 22.066C69.573 23.646 67.37 24.672 64.769 24.672C60.057 24.672 56.346 21.682 56.346 17.139C56.346 14.852 57.176 12.992 58.578 11.682C59.98 10.372 61.97 9.607 64.324 9.607V9.608ZM95.184 9.608C98.104 9.608 100.408 10.809 101.787 12.758L99.177 14.262C98.323 13.018 96.959 12.186 95.184 12.186C93.722 12.186 92.464 12.676 91.588 13.556C90.711 14.438 90.228 15.693 90.228 17.139C90.228 18.584 90.709 19.839 91.586 20.721C92.462 21.602 93.719 22.094 95.184 22.094C96.959 22.094 98.324 21.261 99.178 20.018L101.788 21.522C100.411 23.469 98.105 24.672 95.184 24.672C92.827 24.672 90.839 23.908 89.438 22.598C88.036 21.288 87.205 19.425 87.205 17.138C87.205 14.852 88.035 12.992 89.438 11.682C90.839 10.372 92.829 9.607 95.183 9.607L95.184 9.608ZM112.344 9.608C114.7 9.608 116.688 10.37 118.09 11.68C119.491 12.99 120.32 14.85 120.32 17.135C120.32 17.505 120.264 17.852 120.213 18.201H107.449L107.701 18.871C108.454 20.866 110.481 22.09 112.789 22.09C114.203 22.0963 115.568 21.568 116.609 20.611L119.125 22.066C117.591 23.646 115.389 24.672 112.789 24.672C108.081 24.672 104.365 21.682 104.365 17.139C104.365 14.852 105.195 12.992 106.598 11.682C108 10.372 109.99 9.607 112.344 9.607V9.608ZM75.967 10.053H78.99V13.66H79.98C79.98 12.72 80.524 11.841 81.492 11.166C82.349 10.569 83.556 10.21 84.877 10.123V13.309C84.571 13.251 84.282 13.166 83.945 13.166C81.127 13.166 78.99 15.216 78.99 18.121V24.227H75.967V10.053ZM64.324 12.186C62.019 12.186 60.254 13.461 59.637 15.43L59.435 16.072H69.209L69.009 15.432C68.398 13.462 66.633 12.186 64.324 12.186ZM112.344 12.186C110.034 12.186 108.273 13.462 107.656 15.43L107.456 16.072H117.228L117.029 15.432C116.417 13.462 114.652 12.186 112.344 12.186ZM64.324 13.174C65.951 13.174 66.984 13.953 67.615 15.084H61.035C61.669 13.954 62.7 13.174 64.324 13.174ZM112.344 13.174C113.971 13.174 115.004 13.953 115.634 15.084H109.054C109.688 13.954 110.717 13.174 112.344 13.174Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default Vercel;