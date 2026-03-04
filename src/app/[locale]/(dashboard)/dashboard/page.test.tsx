import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "./page";

vi.mock("@/src/app/_components/PerfilMusicalIA", () => ({
  default: ({ onResult, onData }: { onResult: (t: string) => void; onData: (d: unknown) => void }) => (
    <div data-testid="perfil-musical-ia" />
  ),
}));

vi.mock("./data-spotify/top-artist", () => ({
  TopArtist: () => <div data-testid="top-artist" />,
}));

vi.mock("@/src/app/_components/TopGenere", () => ({
  default: () => <div data-testid="top-genere" />,
}));

vi.mock("./data-spotify/play-list", () => ({
  Playlist: () => <div data-testid="playlist" />,
}));

vi.mock("@/src/app/_components/TimeRangeSelector", () => ({
  default: () => <div data-testid="time-range-selector" />,
}));

vi.mock("@/src/app/_components/Wrapped", () => ({
  Wrapped: () => <div data-testid="wrapped" />,
}));

vi.mock("@/src/app/_components/MusicPredictions", () => ({
  MusicPredictions: () => <div data-testid="music-predictions" />,
}));

describe("Dashboard", () => {
  it("renderiza los componentes principales", () => {
    render(<Dashboard />);

    expect(screen.getByTestId("playlist")).toBeInTheDocument();
    expect(screen.getByTestId("top-genere")).toBeInTheDocument();
    expect(screen.getByTestId("time-range-selector")).toBeInTheDocument();
    expect(screen.getByTestId("top-artist")).toBeInTheDocument();
    expect(screen.getByTestId("perfil-musical-ia")).toBeInTheDocument();
  });

  it("no renderiza Wrapped ni MusicPredictions si iaDate es null", () => {
    render(<Dashboard />);

    expect(screen.queryByTestId("wrapped")).not.toBeInTheDocument();
    expect(screen.queryByTestId("music-predictions")).not.toBeInTheDocument();
  });
});
