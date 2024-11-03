import { Example } from "./Example";

import styles from "./Example.module.css";

export type ExampleModel = {
    text: string;
    value: string;
};

const EXAMPLES: ExampleModel[] = [
    { text: "有休の繰り越し限度は何日ですか？", value: "有休の繰り越し限度は何日ですか？" },
    { text: "PCのパスワードは定期的に変更する必要がありますか？", value: "PCのパスワードは定期的に変更する必要がありますか？" },
    { text: "不審なメールを受信した際は削除しておけばいいですか？", value: "不審なメールを受信した際は削除しておけばいいですか？" }
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
