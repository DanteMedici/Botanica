import { AlertCircle } from 'lucide-react';
import styles from './CampoFormulario.module.css';

export default function CampoFormulario({
  id,
  label,
  tipo = 'text',
  valor,
  onChange,
  error,
  placeholder,
  esTextarea = false,
  filas = 4,
}) {
  return (
    <div className={`${styles.group} ${error ? styles.hasError : ''}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      {esTextarea ? (
        <textarea
          id={id}
          name={id}
          value={valor}
          onChange={onChange}
          placeholder={placeholder}
          rows={filas}
          className={`${styles.control} ${styles.textarea}`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={tipo}
          value={valor}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.control}
        />
      )}

      {error && (
        <div className={styles.errorMessage} role="alert">
          <AlertCircle size={14} className={styles.errorIcon} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
