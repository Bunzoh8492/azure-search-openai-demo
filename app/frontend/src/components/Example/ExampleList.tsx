import { Example } from "./Example";

import styles from "./Example.module.css";

export type ExampleModel = {
    text: string;
    value: string;
};

const EXAMPLES: ExampleModel[] = [
    { text: "保守とはどのような作業ですか？", value: "保守とはどのような作業ですか？" },
    { text: "システム開発の各工程を簡単に説明してください。", value: "システム開発の各工程を簡単に説明してください。" },
    { text: "PCのパスワードは定期的に変更する必要がありますか？", value: "PCのパスワードは定期的に変更する必要がありますか？" }
];

interface Props {
    onExampleClicked: (value: string) => void;
}

export const ExampleList = ({ onExampleClicked }: Props) => {
    return (
        <ul className={styles.examplesNavList}>
            {EXAMPLES.map((x, i) => (
                <li key={i}>
                    <Example text={x.text} value={x.value} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};
