import { describe, it, expect, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "./page";
import { useSession } from "next-auth/react";


vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
}));

vi.mock("@/src/app/_components/loading", () => ({
  default: () => <div data-testid="loading" />,
}));


describe("Dashboard", () => {
  it("renderiza el componente Loading cuando el estado es loading", () => {
    (useSession as Mock).mockReturnValue({
      data: null,
      status: "loading"
    });

    render(<Dashboard />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
