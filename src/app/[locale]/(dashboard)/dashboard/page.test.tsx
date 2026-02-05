import { describe, it, expect, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
}));

import Dashboard from "./page";
import { useSession } from "next-auth/react";

describe("Dashboard", () => {
  it("muestra 'Cargando...' cuando el estado es loading", () => {
    (useSession as Mock).mockReturnValue({ status: "loading" });

    render(<Dashboard />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });
});
