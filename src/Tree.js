import React, { useState } from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const Tree = () => {
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);
  const [SeconderyView, setSeconderyView] = useState([]);

  const data = {
    id: "123",
    name: "Folder1",
    subfolders: [
      {
        id: "2",
        name: "Folder2",
      },
      {
        id: "3",
        name: "Folder3",
      },
    ],
    files: [
      {
        id: "101",
        name: " File1.txt",
      },
      {
        id: "102",
        name: "File2.xml",
      },
    ],
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
    readTreevalue(data, nodeIds);
  };

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {nodes.subfolders.map((value) => {
        return <TreeItem key={value.id} nodeId={value.id} label={value.name} />;
      })}
      {nodes.files.map((value) => {
        return <TreeItem key={value.id} nodeId={value.id} label={value.name} />;
      })}
    </TreeItem>
  );

  const renderTreeValue = (nodes) => (
    <TableRow>
      <TableCell align="center" component="th" scope="row">
        {nodes.id}
      </TableCell>
      <TableCell align="center">{nodes.name}</TableCell>
      {nodes.length > 0 ? nodes.map((node) => renderTree(node)) : null}
    </TableRow>
  );

  const readTreevalue = (nodes, num) => {
    const fileValue = nodes.files.filter(
      (value) => value.id === num.toString()
    )[0];
    const folderValue = nodes.subfolders.filter(
      (value) => value.id === num.toString()
    )[0];

    if (nodes.id === num.toString()) {
      setSeconderyView(nodes);
    } else if (fileValue) {
      setSeconderyView(fileValue);
    } else {
      setSeconderyView(folderValue);
    }
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <TreeView
          expanded={expanded}
          selected={selected}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={["root"]}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {renderTree(data)}
        </TreeView>
      </Grid>
      <Grid item xs={6}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderTreeValue(SeconderyView)}</TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Tree;
