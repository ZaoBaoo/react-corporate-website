// Style
import styles from "./InputPage.module.scss";
import cn from "classnames";

// Animate
import { motion } from "framer-motion";

const InputPage = ({ mode, color, text, label, linkTo, ...props }) => {
  const wrapperLink = (component, link) => {
    return link ? <a href={link}>{component}</a> : component;
  };

  const inputWithoutLabel = (
    <input
      {...props}
      value={text}
      className={cn({
        [styles.name]: color === "light",
        [styles.email]: color === "dark",
      })}
      // maxLength="25"
      type="text"
    />
  );

  const inputWithLabel = (
    <input {...props} value={text} maxLength="18" type="text" />
  );

  return (
    <>
      {mode === "withoutLabel" && wrapperLink(inputWithoutLabel, linkTo)}

      {mode === "withLabel" && (
        <motion.label
          className={styles.label}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <span>{label}</span>
          {wrapperLink(inputWithLabel, linkTo)}
        </motion.label>
      )}
    </>
  );
};

export { InputPage };

// // Style
// import styles from "./InputPage.module.scss";
// import cn from "classnames";

// // Animate
// import { motion } from "framer-motion";

// const InputPage = ({ mode, color, text, label, ...props }) => {
//   return (
//     <>
//       {mode === "withoutLabel" && (
//         <input
//           {...props}
//           value={text}
//           className={cn({
//             [styles.name]: color === "light",
//             [styles.email]: color === "dark",
//           })}
//           // maxLength="25"
//           type="text"
//         />
//       )}

//       {mode === "withLabel" && (
//         <motion.label
//           className={styles.label}
//           initial={{ scale: 1 }}
//           whileHover={{ scale: 1.05 }}
//         >
//           <span>{label}</span>
//           <input {...props} value={text} maxLength="18" type="text" />
//         </motion.label>
//       )}
//     </>
//   );
// };

// export { InputPage };
