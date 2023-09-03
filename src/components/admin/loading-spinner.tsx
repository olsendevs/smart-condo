import { Icons } from '../ui/icons';

export function LoadingSpinner({
  visible,
}: {
  visible: boolean;
}) {
  const spinnerClass = `z-50 fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-lg transition-opacity duration-300 ${
    visible
      ? 'opacity-100'
      : 'opacity-0 pointer-events-none'
  }`;

  return (
    <div className={spinnerClass}>
      <div className="w-16 h-16">
        <Icons.spinner className="w-full h-full animate-spin" />
      </div>
    </div>
  );
}
