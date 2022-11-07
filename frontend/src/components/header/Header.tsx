import "./header.css";

export interface Props {
  icon: string,
  title: string,
  subtitle: string,
  children: any;
}

export const Header: React.FC<Props> = (props) => {
  return (
    <header className="header d-none d-sm-flex flex-column">
        <h1 className="mt-3">
            <i className={`fa fa-${props.icon}`}></i> {props.title}
        </h1>
    <p className="lead text-muted">{props.subtitle}</p>
    </header>
  );
};